// App.tsx
import { useEffect, useState, useCallback } from "react";
import SDK, { type Note } from "./sdk/api";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./components/Dropdown";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    number | null
  >(null);
  const [next, setNext] = useState<string | null>("");
  const [previous, setPrevious] = useState<string | null>("");
  const navigate = useNavigate();

  const fetchNotes = useCallback(
    async (url: string | null) => {
      try {
        setLoading(true);
        const params = selectedCollectionId
          ? { collection_id: selectedCollectionId, page_size: 10 }
          : { page_size: 10 };
        const notesData = await SDK.getNotes(url, params);
        setPrevious(notesData.previous);
        setNext(notesData.next);
        setNotes(notesData.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching notes");
      } finally {
        setLoading(false);
      }
    },
    [selectedCollectionId],
  );

  // Carica e aggiorna le note al cambio della collezione selezionata
  useEffect(() => {
    fetchNotes(null);
  }, [selectedCollectionId, fetchNotes]);

  return (
    <div className="p-6 flex flex-col gap-6 max-w-5xl">
      <Dropdown
        value={selectedCollectionId}
        onChange={setSelectedCollectionId}
      />

      {error && <div className="status-message error">Error: {error}</div>}

      {loading ? (
        <div className="status-message">Loading notes...</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th className="border p-3 w-24">ID</th>
                <th className="border p-3">Title</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note: Note) => (
                <tr key={note.id}>
                  <td className="border p-3">{note.id}</td>
                  <td className="border p-3">
                    <Link to={`/edit/${note.id}`}>{note.title}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="navigate-pages-buttons">
            <button
              className="btn"
              onClick={() =>
                navigate("/edit", {
                  state: { collectionId: selectedCollectionId },
                })
              }
            >
              + New Note
            </button>

            <div className="pagination-group">
              {previous ? (
                <button className="btn" onClick={() => fetchNotes(previous)}>
                  Previous
                </button>
              ) : (
                <button className="btn-disabled">Previous</button>
              )}
              {next ? (
                <button className="btn" onClick={() => fetchNotes(next)}>
                  Next
                </button>
              ) : (
                <button className="btn-disabled">Next</button>
              )}
            </div>
          </div>
          <br />
        </>
      )}
    </div>
  );
}

export default App;
