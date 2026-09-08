import axios from "axios";

// Crea un'istanza personalizzata di Axios preconfigurata per il backend
// "Content-Type" indica al server che le richieste invieranno dati in formato JSON
export const api = axios.create({
	baseURL: "http://localhost:8000",
	headers: {
		"Content-Type": "application/json",
	},
});

// Interceptor di richiesta: viene eseguito prima dell'invio di qualsiasi chiamata API.
// Recupera l'access token dal localStorage (se presente) e lo inserisce nell'header Authorization.
// Se il token non c'è, la richiesta parte senza header (gli endpoint protetti risponderanno con 401).
// Il secondo parametro cattura eventuali errori di configurazione prima dell'invio della richiesta.
api.interceptors.request.use(
	(config) => {
		const access = localStorage.getItem("access");
		if (access) {
			config.headers.Authorization = `Bearer ${access}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);


// Stato globale dell'intercettore per evitare chiamate di refresh duplicate (thundering herd)
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

// Helper: gestisce la chiamata di refresh e la persistenza dei token
async function executeTokenRefresh(): Promise<string> {
    try {
        const refresh = localStorage.getItem("refresh");
        const res = await api.post("/api/auth/refresh/", { refresh });

        const { access, refresh: newRefresh } = res.data;

        localStorage.setItem("access", access);
        if (newRefresh) {
            localStorage.setItem("refresh", newRefresh);
        }

        return access;
    } catch (error) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        throw error;
    } finally {
        isRefreshing = false;
        refreshPromise = null;
    }
}

// Interceptor di risposta: intercetta tutte le risposte che ritornano dal backend.
// Se una richiesta fallisce con errore 401 (token scaduto), tenta di rinnovare il token 
// in modo trasparente per l'utente, rieseguendo poi la richiesta originale fallita.
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const isUnauthorized = error.response?.status === 401;
        const isRefreshRequest = Boolean(originalRequest.url?.includes("/api/auth/refresh"));
        const hasAlreadyRetried = Boolean(originalRequest._retry);

        // Uscita rapida se l'errore non deve attivare il refresh
        if (!isUnauthorized || isRefreshRequest || hasAlreadyRetried) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        // Avvia il refresh solo per la prima richiesta che rileva il 401
        if (!isRefreshing) {
            isRefreshing = true;
            refreshPromise = executeTokenRefresh();
        }

        // Tutte le richieste 401 attendono la stessa Promise
        const newAccess = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return api.request(originalRequest);
    }
);