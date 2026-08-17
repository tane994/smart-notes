import { useEffect, useState, type ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'
import SDK, { type Note } from './sdk/api';

const Edit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  console.log(id);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const noteData = await SDK.getNote(Number(id));
        if(noteData) {
          setTitle(noteData.title);
          setContent(noteData.content);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching notes');
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
    setContent(e.target.value)
  }

  if (loading) return <div className="status-message">Caricamento nota...</div>;

  const handleSave = async () => {
    try {
      setSaving(true);
      await SDK.updateNote(Number(id), {title: title, content: content});
    } catch(err) {
      setError(err instanceof Error ? err.message: 'Error deleting notes');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setSaving(true);
      await SDK.deleteNote(Number(id));
    } catch(err) {
      setError(err instanceof Error ? err.message: 'Error deleting notes');
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <div>
      {error && <div className="status-message error">Error: {error}</div>}
          <h1>Edit Note</h1>
          <input 
            value={ title } 
            onChange={updateNoteTitle}
          />
          <br />
          <br />
          <textarea 
            value={ content }  
            onChange={updateNoteContent}
          />
          <br />
          <br />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default Edit