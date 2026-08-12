import SDK, { type Note, type Collection } from './api.ts';
import axios from 'axios';

try {
    const data: string = await SDK.getHome();
    const collection1 = await SDK.createCollection({'name': 'Programming notes'});
    const collection2 = await SDK.createCollection({'name': 'Finance notes'});

    const note1: Note = {
            "title": "Gestione del Lifecycle dei Token JWT",
            "content": "Quando l'Access Token scade, non è necessario chiedere di nuovo le credenziali all'utente. Si invia una richiesta POST all'endpoint di refresh inviando il payload {\"refresh\": \"<REFRESH_TOKEN>\"}. L'utente deve effettuare nuovamente il login completo con username e password solo se il Refresh Token è a sua volta scaduto, invalido o è stato revocato.",
            "collection": collection1.collection_id
        }
    
    const createdNote = await SDK.createNote(note1);

    console.log(await SDK.getNotes())

    if(createdNote.note_id) {
        await SDK.updateNote(createdNote.note_id, {
        'title': 'Nota modificata',
        'content': 'nota modificata e spostata in collection 2',
        'collection': 2
        });
    }


    console.log(data);

    // Nota 1: Dinamica delle SMID-Cap e Pod Shop
    const note2: Note = {
        "title": "Dinamica delle SMID-Cap e Pod Shop",
        "content": "I grandi fondi multi-manager (Pod Shop come Citadel o Millennium) non investono nelle Small/Mid Cap alla ricerca di multi-bagger (5x o 10x). Sfruttano invece la leva finanziaria (da 3x a 6x) su pair trade e posizioni relative a breve termine per catturare spread alfa immediati con basso rischio di drawdown.",
        'collection': collection2.collection_id
    };

    // Nota 2: Limiti Informativi dei Report 13F
    const note3: Note = {
        "title": "Limiti Informativi dei Report 13F",
        "content": "Tracciare le posizioni istituzionali dai moduli 13F porta a un ritardo informativo fino a 45 giorni rispetto alla chiusura del trimestre. I grandi fondi possono aver già chiuso o invertito la posizione (andando short) molto prima che il dato diventi pubblico per il mercato retail.",
        "collection": collection2.collection_id
    };

    await SDK.createNote(note2);
    await SDK.createNote(note3);

    console.log(await SDK.getNotes());
    // Nota 3: Incentivi e Asimmetria nei Fondi di Investimento
    // const note3: Note = {
    //     "title": "Incentivi e Asimmetria nei Fondi di Investimento",
    //     "content": "La ricerca del massimo rendimento assoluto guidata dalla legge di potenza (Power Law) appartiene principalmente ai fondi VC ed ai fund manager emergenti (primo fondo). I grandi allocatori istituzionali (pensioni, fondi sovrani) e i family office tradizionali mettono invece al primo posto la preservazione del capitale e la gestione delle passività.",
    //     "collection":2
    // };

    const completeCollections: Collection[] = await SDK.getCollectionWithNotes(2);
    console.log(completeCollections)

    await SDK.deleteCollection(2);

    console.log(completeCollections)

    // await SDK.deleteNote(2);
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