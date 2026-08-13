import SDK, { type Note, type Collection } from './api.ts';
import axios from 'axios';
import { programmingNotes, financeNotes } from '../mock-data/mockData';

const idOf = (x: any): number => x?.id ?? x?.collection_id ?? x?.note_id;

async function wipe() {
    const notes = await SDK.getNotes();
    for (const n of notes) await SDK.deleteNote(idOf(n));

    const cols = await SDK.getCollections();
    for (const c of cols) await SDK.deleteCollection(idOf(c));

    console.log(`🧹 wipe: ${notes.length} note, ${cols.length} collection`);
}

try {
    await wipe();

    const collection1 = await SDK.createCollection({ 'name': 'Programming notes' });
    const collection2 = await SDK.createCollection({ 'name': 'Finance notes' });

    const insertNotesInCollection = async (notes: Note[], collection: Collection) => {
        for(const note of notes) {
            await SDK.createNote({...note, collection: collection.collection_id});
        }
    }

    insertNotesInCollection(programmingNotes, collection1);
    insertNotesInCollection(financeNotes, collection2);
} catch(err) {
    if (axios.isAxiosError(err)) {
        console.error('❌ ERRORE AXIOS DETTAGLIATO:');
        console.error(' Method:', err.config?.method?.toUpperCase());
        console.error(' URL:', err.config?.url);
        console.error(' Status:', err.response?.status);
        console.error(' Payload Inviato:', err.config?.data);
        console.error(' Risposta del Server:', err.response?.data);
    } else if (err instanceof Error) {
        console.error('Error:', err.message);
    } else {
        console.error('Something went wrong');
    }
}