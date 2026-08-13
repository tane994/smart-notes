import { useEffect, useState } from 'react';
import SDK, { type Collection, type Note } from './sdk/api';
import './App.css';
import CreatableSelect from 'react-select/creatable';

function App() {

  type CollectionOption = { value: number | undefined; label: string };
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[]>([])
  const [collectionValue, setCollectionValue] = useState<CollectionOption | null>(null);

  useEffect(() => {
      const fetchNotes = async () => {
        const notesData = await SDK.getNotes();
        setNotes(notesData);
      }

      const fetchCollections = async () => {
        const collectionsData = await SDK.getCollections();
        setCollections(collectionsData);
      }
      
      const loadAllData = async () => {
        try {
          setLoading(true);
          await Promise.all([fetchNotes(), fetchCollections()])
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
          setLoading(false);
        }
      }
      loadAllData();
  }, []);

  if (loading) {
    return <div className="status-message">Loading notes...</div>;
  }

  if (error) {
    return <div className="status-message error">Error: {error}</div>;
  }

const createNewCollection = async (name: string) => {
  console.log('create called:', name);
  const created = await SDK.createCollection({ name });
  console.log('created:', created);
  setCollections((prev) => [...prev, created]);
  setCollectionValue({ value: created.id, label: created.name });
};

  return (
    <>
      <main className="container">
        <CreatableSelect<CollectionOption, false>
          options={collections.map((c) => ({ value: c.id, label: c.name }))}
          value={collectionValue}
          onChange={(option) => setCollectionValue(option)}
          onCreateOption={createNewCollection}
        />
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
            <th>ID</th>
            <th>Title</th>
            </tr>
          </thead>
          <tbody>
          {notes.map((note: Note) => {
            return <tr key={note.id}>
              <td>{note.id}</td>
              <td>{note.title}</td>
            </tr>
          })}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default App;