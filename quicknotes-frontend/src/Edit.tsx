import { useEffect, useState, type ChangeEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SDK from './sdk/api';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // FIX: If there's no ID, we are creating a note, so loading starts as false
  const [loading, setLoading] = useState<boolean>(!!id);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (!id) return;

    const fetchNote = async () => {
      try {
        setLoading(true);
        const noteData = await SDK.getNote(Number(id));
        if (noteData) {
          setTitle(noteData.title ?? '');
          setContent(noteData.content ?? '');
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
  }

  const updateNoteContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  // FIX: Handle both create and update operations based on `id`
const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      if (id) {
        const updatedNote = await SDK.updateNote(Number(id), { title, content });
        navigate(`/edit/${updatedNote.id}`); 
      } else {
        const newNote = await SDK.createNote({ title, content });
        navigate(`/edit/${newNote.id}`);
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
      <button onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : 'Save'}
      </button>
      
      {/* Hide delete button if creating a new note */}
      {id && (
        <button onClick={handleDelete} disabled={saving}>
          Delete
        </button>
      )}
      
      <br />
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  )
}

export default Edit;