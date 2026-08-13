import { type Note } from '../sdk/api';

export const programmingNotes: Note[] = [
    {
        "title": "Gestione del Lifecycle dei Token JWT",
        "content": "Quando l'Access Token scade, non è necessario chiedere di nuovo le credenziali all'utente. Si invia una richiesta POST all'endpoint di refresh inviando il payload {\"refresh\": \"<REFRESH_TOKEN>\"}. L'utente deve effettuare nuovamente il login completo solo se il Refresh Token è a sua volta scaduto, invalido o revocato."
    },
    {
        "title": "Refresh Token Rotation e Blacklist",
        "content": "Con ROTATE_REFRESH_TOKENS ogni refresh emette un token nuovo. Senza BLACKLIST_AFTER_ROTATION il precedente resta valido fino alla scadenza naturale: la rotation da sola non è revoca."
    },
    {
        "title": "Serializer nested vs PrimaryKeyRelatedField",
        "content": "Il nested serializer è read-only di default e per scrivere richiede un override di create e update. PrimaryKeyRelatedField tiene la scrittura semplice ma costringe il client a una seconda chiamata per i dati correlati."
    },
    {
        "title": "ViewSet vs APIView in DRF",
        "content": "ModelViewSet genera le sei action CRUD e si registra sul router. APIView dà controllo totale sui metodi HTTP ma impone di scrivere url pattern e permission a mano."
    },
    {
        "title": "Paginazione DRF e il campo results",
        "content": "Con PageNumberPagination attiva la response non è più un array ma un oggetto con count, next, previous e results. Ogni client che fa res.data.map si rompe in silenzio appena si supera la page size."
    },
    {
        "title": "Filtering: query params vs path segment",
        "content": "Il path identifica una risorsa, la query string la restringe. /api/notes/?collection=2&search=jwt resta componibile e cache-friendly, mentre /api/collections/2/notes/ moltiplica gli endpoint da mantenere."
    },
    {
        "title": "unknown vs any nel catch block",
        "content": "Con useUnknownInCatchVariables l'errore è unknown e va ristretto con type guard come axios.isAxiosError o instanceof Error. any spegne il compiler proprio dove il runtime è meno prevedibile."
    },
    {
        "title": "Discriminated union per gli stati di fetch",
        "content": "Modellare status come idle, loading, success o error con il payload legato alla variante elimina gli stati impossibili, tipo loading a true con data già popolata."
    },
    {
        "title": "useEffect e race condition nelle fetch",
        "content": "Due render ravvicinati lanciano due richieste: la più lenta può risolversi per ultima e sovrascrivere la risposta corretta. Serve un flag di cancellazione nel cleanup o un AbortController."
    },
    {
        "title": "AbortController per le richieste in volo",
        "content": "Axios accetta un signal nella config. Abortire nel cleanup dell'effect evita sia i setState su componenti smontati sia banda sprecata su navigazioni rapide."
    },
    {
        "title": "Interceptor Axios per il refresh automatico",
        "content": "Un response interceptor sul 401 può fare il refresh e riprovare la richiesta originale. Senza una coda condivisa, N chiamate parallele scatenano N refresh concorrenti."
    },
    {
        "title": "CORS: preflight e credentials",
        "content": "Content-Type application/json e header Authorization fanno scattare il preflight OPTIONS. Con withCredentials il server non può rispondere Access-Control-Allow-Origin asterisco: serve l'origin esplicita."
    },
    {
        "title": "N+1 query nell'ORM Django",
        "content": "select_related fa la JOIN sulle ForeignKey, prefetch_related fa una seconda query per le relazioni many. Un serializer nested senza uno dei due genera una query per riga."
    },
    {
        "title": "Indici parziali in PostgreSQL",
        "content": "Un indice con clausola WHERE copre solo il sottoinsieme davvero interrogato: più piccolo in memoria e più economico da mantenere in scrittura rispetto all'indice completo."
    }
];

export const financeNotes: Note[] = [
    {
        "title": "Dinamica delle SMID-Cap e Pod Shop",
        "content": "I grandi fondi multi-manager non investono nelle Small/Mid Cap alla ricerca di multi-bagger. Sfruttano la leva finanziaria da 3x a 6x su pair trade e posizioni relative a breve termine per catturare spread alfa con basso rischio di drawdown."
    },
    {
        "title": "Limiti Informativi dei Report 13F",
        "content": "Tracciare le posizioni istituzionali dai moduli 13F comporta un ritardo informativo fino a 45 giorni rispetto alla chiusura del trimestre. Il fondo può aver già chiuso o invertito la posizione prima che il dato diventi pubblico."
    },
    {
        "title": "Incentivi e Asimmetria nei Fondi di Investimento",
        "content": "La ricerca del massimo rendimento assoluto guidata dalla power law appartiene ai fondi VC e ai manager emergenti al primo fondo. Pensioni, fondi sovrani e family office tradizionali mettono al primo posto la preservazione del capitale."
    },
    {
        "title": "ROIC vs ROE: il ruolo della leva",
        "content": "Il ROE si gonfia con il debito senza creazione di valore aggiuntiva. Il ROIC misura il rendimento su tutto il capitale impiegato ed è l'unico dei due confrontabile tra strutture finanziarie diverse."
    },
    {
        "title": "Owner Earnings",
        "content": "Utile netto più ammortamenti meno le capex necessarie a mantenere la posizione competitiva. Il punto fragile è separare capex di mantenimento da capex di crescita: il bilancio non lo fa."
    },
    {
        "title": "Reverse DCF",
        "content": "Invece di stimare i flussi futuri si parte dal prezzo e si ricava il tasso di crescita implicito. La domanda diventa se quelle aspettative sono plausibili, non quanto vale l'azienda."
    },
    {
        "title": "EV/EBITDA e le aziende capital intensive",
        "content": "L'EBITDA ignora le capex di mantenimento: su business ad alta intensità di capitale fa sembrare economico ciò che brucia cassa. EV/FCF racconta una storia diversa."
    },
    {
        "title": "Switching cost vs network effect",
        "content": "Lo switching cost protegge la base installata ma non aiuta ad acquisire clienti nuovi. Il network effect fa entrambe le cose ma è più fragile quando il valore si concentra su pochi nodi."
    },
    {
        "title": "Working capital negativo",
        "content": "Incassare prima di pagare i fornitori significa finanziare la crescita con la cassa dei clienti. La contrazione però libera cassa e può mascherare per qualche trimestre un deterioramento del business."
    },
    {
        "title": "Buyback e valore intrinseco",
        "content": "Il riacquisto crea valore solo sotto il valore intrinseco. Sopra, trasferisce ricchezza da chi resta a chi vende, per quanto l'EPS migliori grazie al minor numero di azioni."
    },
    {
        "title": "Il costo del capitale non è il WACC da manuale",
        "content": "Il beta storico misura volatilità passata, non rischio operativo. Meglio partire dal rischio del settore e dall'esposizione geografica dei ricavi che da una regressione sul prezzo."
    },
    {
        "title": "Leva operativa e sensibilità del margine",
        "content": "Con costi fissi alti una variazione modesta dei ricavi amplifica il margine in entrambe le direzioni. Il margine espanso in fase espansiva quasi mai è efficienza strutturale."
    },
    {
        "title": "Impairment del goodwill",
        "content": "La svalutazione è non-cash ma certifica che il prezzo pagato in acquisizione non era recuperabile. Ripetuta nel tempo è un giudizio sulla capacità di allocazione del capitale del management."
    },
    {
        "title": "Free float e copertura istituzionale",
        "content": "Sotto una certa capitalizzazione un fondo grande non riesce a costruire una posizione rilevante senza muovere il prezzo. Da lì la minore copertura sell-side e le inefficienze persistenti."
    }
];