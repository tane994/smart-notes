import axios from 'axios';

const jwtAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzg3MDgxMTAxLCJpYXQiOjE3ODcwMzc5MDEsImp0aSI6ImZhYTQwY2E4MDVmNTQ2MzBhN2Y5ZGQxYjgwNDY4NjkyIiwidXNlcl9pZCI6IjEifQ.26syJ6JmBwskXTwD5E1GxHt-W10s03YjuQWLWBecN18';

export type Note = {
    id?: number;          // Aggiunto per flessibilità se il DRF usa 'id'
    note_id?: number;     // Mantenuto per compatibilità
    title: string;
    content: string;
    collection?: number | null;
    collection_data?: Collection | null;
};

export type Collection = {
    id?: number;
    collection_id?: number;
    name: string;
};

// Tipo helper per gestire le risposte incapsulate (es. { data: ... })
interface APIResponse<T> {
    data: T;
    message?: string;
}

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtAccessToken}`,
    },
});

// Metodi per le Note
async function getHome(): Promise<string> {
    const res = await api.get<string>('/');
    return res.data;
}

async function getNotes(params?: {
    collection_id?: number | null
}): Promise<Note[]> {
    const res = await api.get<APIResponse<Note[]> | Note[]>('/api/notes/', { params });
    // Gestisce sia il caso in cui il backend incapsuli in res.data.data che res.data diretto
    return (res.data as any).data ?? res.data;
}

async function getNote(noteId: number): Promise<Note> {
    const res = await api.get<any>(`/api/notes/${noteId}/`);
    return res.data.data ?? res.data;
}

async function createNote(note: Note): Promise<Note> {
    const res = await api.post<any>('/api/notes/', note);
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

// Metodi per le Collection
async function getCollections(): Promise<Collection[]> {
    const res = await api.get<any>('/api/collections/');
    return res.data.data ?? res.data;
}

async function getCollection(collectionId: number): Promise<Collection> {
    const res = await api.get<any>(`/api/collections/${collectionId}/`);
    return res.data.data ?? res.data;
}

async function createCollection(collection: Collection): Promise<Collection> {
    const res = await api.post<any>('/api/collections/', collection);
    return res.data.data ?? res.data;
}

async function getCollectionWithNotes(collectionId: number): Promise<Collection> {
    const res = await api.get<any>(`/api/collections/${collectionId}/notes/`);
    return res.data.data ?? res.data;
}


async function updateCollection(collectionId: number, collection: Collection): Promise<Collection> {
    const res = await api.put<any>(`/api/collections/${collectionId}/`, collection);
    return res.data.data ?? res.data;
}

async function deleteCollection(collectionId: number): Promise<void> {
    await api.delete(`/api/collections/${collectionId}/`);
}

export default {
    getHome,
    getNotes,
    getNote,
    updateNote,
    deleteNote,
    createNote,
    getCollections,
    getCollection,
    getCollectionWithNotes,
    createCollection,
    updateCollection,
    deleteCollection,
};