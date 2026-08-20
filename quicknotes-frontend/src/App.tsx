// App.tsx
import { useEffect, useState, useCallback } from 'react';
import SDK, { type Note } from './sdk/api';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from './components/Dropdown';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null);
  const [next, setNext] = useState<string|null>('');
  const [previous, setPrevious] = useState<string|null>('');
  const navigate = useNavigate();

const fetchNotes = useCallback(
  async (url: string | null) => {
    try {
      setLoading(true);
      const params = selectedCollectionId ? { collection_id: selectedCollectionId } : undefined;
      const notesData = await SDK.getNotes(url, params);
      setPrevious(notesData.previous);
      setNext(notesData.next);
      setNotes(notesData.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching notes');
    } finally {
      setLoading(false);
    }
  }, 
  [selectedCollectionId] 
);

  // Carica e aggiorna le note al cambio della collezione selezionata
  useEffect(() => {
    fetchNotes(null);
  }, [selectedCollectionId, fetchNotes]);

  return (
    <>
      <Dropdown value={selectedCollectionId} onChange={setSelectedCollectionId}/>

      {error && <div className="status-message error">Error: {error}</div>}

      {loading ? (
        <div className="status-message">Loading notes...</div>
      ) : (
        <>
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
          {previous ? <button onClick={() => fetchNotes(previous)}>Previous</button> : <></>}
          {next ? <button onClick={() => fetchNotes(next)}>Next</button>  : <></>}
          <br />
          <button onClick={() => navigate('/edit', {state: {collectionId: selectedCollectionId}})}>+ Create New Note</button>
        </>
      )}
    </>
  );
}

export default App;