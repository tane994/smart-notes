import axios from "axios";

// ============================================================================
// Types
// ============================================================================

export type Collection = {
  id?: number;
  collection_id?: number;
  name: string;
};

export type Note = {
  id?: number; // Aggiunto per flessibilità se il DRF usa 'id'
  note_id?: number; // Mantenuto per compatibilità
  title: string;
  content: string;
  collection?: number | null;
  collection_data?: Collection | null;
};

export type PaginatedResponse<T> = {
  next: string | null;
  previous: string | null;
  data: T[];
};

export type User = {
  id?: number;
  email?: string;
  password?: string;
  username: string;
};

// ============================================================================
// Axios instance
// ============================================================================

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================================
// Interceptors
// ============================================================================

// --- Request: attach access token ---
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

// --- Response: refresh token on 401 (single-flight) ---
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response?.status == 401 &&
      !error.config.url.includes("/api/auth/refresh") &&
      !error.config._retry
    ) {
      error.config._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = (async () => {
          try {
            const refresh = localStorage.getItem("refresh");
            const res = await api.post("/api/auth/refresh/", { refresh });

            const newAccess = res.data.access;
            const newRefresh = res.data.refresh;

            localStorage.setItem("access", newAccess);
            localStorage.setItem("refresh", newRefresh);

            return newAccess;
          } finally {
            isRefreshing = false;
          }
        })();
      }

      const newAccess = await refreshPromise;

      error.config.headers.Authorization = `Bearer ${newAccess}`;
      return api.request(error.config);
    }
    return Promise.reject(error);
  },
);

// ============================================================================
// API — Auth
// ============================================================================


async function register(data: User) {
  const res = await api.post('/api/auth/register/', data);
  
  if(res.data.access && res.data.refresh) {
    // localStorage.setItem('access', res.data.access);
    // localStorage.setItem('refresh', res.data.refresh);
  }

  return res.data;
}

async function login(data: User) {
    const res = await api.post('/api/auth/login/', data);
  
  if(res.data.access && res.data.refresh) {
    // localStorage.setItem('access', res.data.access);
    // localStorage.setItem('refresh', res.data.refresh);
  }

  return res.data;
}

// ============================================================================
// API — Misc
// ============================================================================

async function getHome(): Promise<string> {
  const res = await api.get<string>("/");
  return res.data;
}

// ============================================================================
// API — Notes
// ============================================================================

async function getNotes(
  url?: string | null,
  params?: {
    collection_id?: number | null;
    page_size?: number | null;
  },
): Promise<PaginatedResponse<Note>> {
  if (url) {
    const res = await api.get<PaginatedResponse<Note>>(url, { params });
    return res.data;
  }

  const res = await api.get<PaginatedResponse<Note>>("/api/notes/", { params });
  return res.data;
}

async function getNote(noteId: number): Promise<Note> {
  const res = await api.get<any>(`/api/notes/${noteId}/`);
  return res.data.data ?? res.data;
}

async function createNote(note: Note): Promise<Note> {
  const res = await api.post<any>("/api/notes/", note);
  return res.data.data ?? res.data;
}

async function updateNote(noteId: number, note: Note): Promise<Note> {
  const res = await api.put<any>(`/api/notes/${noteId}/`, note);
  return res.data.data ?? res.data;
}

async function deleteNote(noteId: number): Promise<string> {
  await api.delete(`/api/notes/${noteId}/`);
  return `Note with id ${noteId} deleted successfully`;
}

// ============================================================================
// API — Collections
// ============================================================================

async function getCollections(): Promise<Collection[]> {
  const res = await api.get<any>("/api/collections/");
  return res.data.data ?? res.data;
}

async function getCollection(collectionId: number): Promise<Collection> {
  const res = await api.get<any>(`/api/collections/${collectionId}/`);
  return res.data.data ?? res.data;
}

async function getCollectionWithNotes(
  collectionId: number,
): Promise<Collection> {
  const res = await api.get<any>(`/api/collections/${collectionId}/notes/`);
  return res.data.data ?? res.data;
}

async function createCollection(collection: Collection): Promise<Collection> {
  const res = await api.post<any>("/api/collections/", collection);
  return res.data.data ?? res.data;
}

async function updateCollection(
  collectionId: number,
  collection: Collection,
): Promise<Collection> {
  const res = await api.put<any>(
    `/api/collections/${collectionId}/`,
    collection,
  );
  return res.data.data ?? res.data;
}

async function deleteCollection(collectionId: number): Promise<void> {
  await api.delete(`/api/collections/${collectionId}/`);
}

// ============================================================================
// Export
// ============================================================================

export default {
  // Misc
  getHome,

  // Auth
  register,
  login,

  // Notes
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,

  // Collections
  getCollections,
  getCollection,
  getCollectionWithNotes,
  createCollection,
  updateCollection,
  deleteCollection,
};