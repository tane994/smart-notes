import SDK, { type Note, type Collection } from './api.ts';
import axios from 'axios';
import { programmingNotes, financeNotes } from '../mock-data/mockData';

const idOf = (x: any): number => x?.id ?? x?.collection_id ?? x?.note_id;

async function wipe() {
    const notes = await SDK.getNotes();
    for (const n of notes) await SDK.deleteNote(idOf(n));

    const cols = await SDK.getCollections();
    for (const c of cols) await SDK.deleteCollection(idOf(c));

    console.log(`🧹 wipe: ${notes.length} note, ${cols.length} collection eliminate`);
}

async function seed() {
    try {
        await wipe();

        const collection1: Collection = await SDK.createCollection({ name: 'Programming notes' });
        const collection2: Collection = await SDK.createCollection({ name: 'Finance notes' });

        const collection1Id = idOf(collection1);
        const collection2Id = idOf(collection2);

        const insertNotesInCollection = async (notes: Note[], collectionId: number) => {
            for (const note of notes) {
                // Inviamo l'ID della collezione corretto nel campo 'collection'
                await SDK.createNote({
                    ...note,
                    collection: collectionId,
                });
            }
        };

        // Aggiunti gli await per garantire l'inserimento sequenziale prima del termine dello script
        await insertNotesInCollection(programmingNotes, collection1Id);
        await insertNotesInCollection(financeNotes, collection2Id);

        console.log('✅ Seed completato con successo!');
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.error('❌ ERRORE AXIOS DETTAGLIATO:');
            console.error(' Method:', err.config?.method?.toUpperCase());
            console.error(' URL:', err.config?.url);
            console.error(' Status:', err.response?.status);
            console.error(' Payload Inviato:', err.config?.data);
            console.error(' Risposta del Server:', JSON.stringify(err.response?.data, null, 2));
        } else if (err instanceof Error) {
            console.error('Error:', err.message);
        } else {
            console.error('Something went wrong');
        }
    }
}

seed();