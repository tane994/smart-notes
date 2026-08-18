import { useEffect, useState } from 'react';
import SDK, { type Collection, type Note } from './sdk/api';
import './App.css';
import CreatableSelect from 'react-select/creatable';
import { Link, useNavigate } from 'react-router-dom';

function App() {
  type CollectionOption = { value: number | undefined; label: string };

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Carica le collezioni al mount del componente
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const collectionsData = await SDK.getCollections();
        setCollections(collectionsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching collections');
      }
    };

    fetchCollections();
  }, []);

  // Carica e aggiorna le note al cambio della collezione selezionata
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const notesData = await SDK.getNotes(
          selectedCollectionId ? { collection_id: selectedCollectionId } : {}
        );
        setNotes(notesData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching notes');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [selectedCollectionId]);

  const createNewCollection = async (name: string) => {
    try {
      const newlyCreatedCollection = await SDK.createCollection({ name });
      setCollections((prev) => [...prev, newlyCreatedCollection]);
      setSelectedCollectionId(newlyCreatedCollection.id ?? null);
    } catch (err) {
      console.log('Error creating collection: ', err);
    }
  };

  // Valore derivato per il Select (nessuno stato duplicato)
  const selectedCollection = collections.find((c) => c.id === selectedCollectionId);
  const collectionValue: CollectionOption | null = selectedCollection
    ? { value: selectedCollection.id, label: selectedCollection.name ?? '' }
    : null;

  return (
    <>
      <CreatableSelect<CollectionOption, false>
        options={collections.map((c) => ({ value: c.id, label: c.name }))}
        value={collectionValue}
        onChange={(data) => setSelectedCollectionId(data?.value ?? null)}
        onCreateOption={createNewCollection}
        isClearable
      />

      {error && <div className="status-message error">Error: {error}</div>}

      {loading ? (
        <div className="status-message">Loading notes...</div>
      ) : (
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note: Note) => (
              <tr key={note.id}>
                <td>{note.id}</td>
                <td><Link to={`/edit/${note.id}`}>{note.title}</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
      <button onClick={() => navigate('/edit')}>+ Create New Note</button>
    </>
  );
}

export default App;