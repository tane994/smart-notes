import { useEffect, useState, type ChangeEvent } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import SDK from './sdk/api';
import Dropdown from './components/Dropdown';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const collectionId = location.state?.collectionId;

  const [loading, setLoading] = useState<boolean>(!!id);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [collection, setCollection] = useState<number | null>(collectionId? collectionId : null);

  useEffect(() => {
    if (!id) return;

    const fetchNote = async () => {
      try {
        setLoading(true);
        const noteData = await SDK.getNote(Number(id));
        if (noteData) {
          setTitle(noteData.title ?? '');
          setContent(noteData.content ?? '');
          setCollection(noteData.collection ?? null);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching note');
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const updateNoteTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const updateNoteContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // UNICO PUNTO DI SALVATAGGIO
  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      
      const payload = { title, content, collection };

      if (id) {
        const updatedNote = await SDK.updateNote(Number(id), payload);
        // Sincronizza lo stato locale con la risposta del backend
        setTitle(updatedNote.title ?? title);
        setContent(updatedNote.content ?? content);
        setCollection(updatedNote.collection ?? collection);
        alert('Nota salvata con successo!');
      } else {
        const newNote = await SDK.createNote(payload);
        const newId = newNote.id ?? newNote.note_id;
        navigate(`/edit/${newId}`);
      }
    } catch(err) {
      setError(err instanceof Error ? err.message : 'Error saving note');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('Sei sicuro di voler eliminare questa nota?')) return;

    try {
      setSaving(true);
      await SDK.deleteNote(Number(id));
      navigate('/');
    } catch(err) {
      setError(err instanceof Error ? err.message : 'Error deleting note');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="status-message">Caricamento nota...</div>;
  
  return (
    <div>
      {error && <div className="status-message error">Error: {error}</div>}
      <h1>{id ? 'Edit Note' : 'Create Note'}</h1>
      <input 
        value={title} 
        onChange={updateNoteTitle}
        placeholder="Title"
      />
      <br /><br />
      <textarea 
        value={content}  
        onChange={updateNoteContent}
        placeholder="Content..."
      />
      <br /><br />
      {/* Semplificato: Passiamo direttamente setCollection senza chiamate API intermedie */}
      <Dropdown value={collection} onChange={setCollection} />
      <br /><br />
      <button onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : 'Save'}
      </button>
      
      {id && (
        <button onClick={handleDelete} disabled={saving}>
          Delete
        </button>
      )}
  
      <br />
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  );
};

export default Edit;