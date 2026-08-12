
import axios from 'axios'

const jwtAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzg2NTQxNjc0LCJpYXQiOjE3ODY1NDEzNzQsImp0aSI6IjAwNzVmMjMyYWIwNzRiNDI4YWQ5ZTZhMzcwOTMyNDFmIiwidXNlcl9pZCI6IjEifQ.lhUv-Haq0nSjgkRbtXvmdpRz2RBXyyRx2SI9SnniX6s'


export type Note = {
    note_id?: number,
    title: string,
    content: string,
    collection?: number | null,
    collection_data?: Collection | null
}

export type Collection = {
    collection_id?: number,
    name: string
}

const api = axios.create({
    // baseURL: 'http://webdev:8000'
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${jwtAccessToken}`
    }
});

async function getHome(): Promise<string> {
    const res = await api.get<string>('/')
    return res.data;
}

async function getNotes(): Promise<Note[]>{
    const res = await api.get<any>('/api/notes/');
    return res.data.data;
}

async function getNote(noteId: number) {
    const res = await api.get<any>(`/api/notes/${noteId}/`)
    return res.data.data;
};

async function createNote(note: Note): Promise<Note> {
    const res = await api.post('/api/notes/', note)
    return res.data;
}

async function updateNote(noteId: number, note: Note): Promise<Note> {
    const res = await api.put<any>(`/api/notes/${noteId}/`, note)
    return res.data.data;
};

async function deleteNote(noteId: number): Promise<string> {
  await api.delete(`/api/notes/${noteId}/`);
  return `Note with id ${noteId} deleted successfully`;
}

async function getCollections(): Promise<Collection[]> {
    const res = await api.get<any>('/api/collections/');
    return res.data.data;
};

async function getCollection(collectionId: number): Promise<Collection[]> {
    const res = await api.get<any>(`/api/collections/${collectionId}/`);
    return res.data.data;
};

async function createCollection(collection: Collection) {
    const res = await api.post('/api/collections/', collection)
    return res.data;
}

async function getCollectionWithNotes(collectionId: number): Promise<Collection[]> {
    const res = await api.get<any>(`/api/collections/${collectionId}/notes/`);
    return res.data.data;
};

async function updateCollection(collectionId: number, collection: Collection): Promise<Collection> {
    const res = await api.put<any>(`/api/collections/${collectionId}/`, collection)
    return res.data.data;
};

async function deleteCollection(collectionId: number): Promise<Collection> {
    const res = await api.delete<any>(`/api/collections/${collectionId}/`)
    return res.data.data;
};

/*
Notes
Notes by collection
Create a note
Individual Note (with collection data)
Get a collection
Edit a collection
Delete a collection
*/

export default {
    getHome,
    // notes
    getNotes,
    getNote,
    updateNote,
    deleteNote,
    createNote,
    // collection
    getCollections,
    getCollection,
    getCollectionWithNotes,
    createCollection,
    updateCollection,
    deleteCollection
}

