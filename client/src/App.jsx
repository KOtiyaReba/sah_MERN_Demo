import { useEffect, useState } from 'react';
import { getTasks, createTask } from './services/api';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const created = await createTask({ title, description });
      setTasks([created, ...tasks]);
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }
  return (
    <main>
      <h1>Task Tracker</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title </label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br></br>   <br></br>

        <label htmlFor="description">Description </label>
        <textarea id="description" value={description}
        
          onChange={(e) => setDescription(e.target.value)} />
             <br></br>

        <button type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save task'}
        </button>
      </form>

      {error && <p role="alert">{error}</p>}
      {loading && <p>Loading…</p>}
      {!loading && tasks.length === 0 && <p>No tasks yet. Add your first one.</p>}

      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            <strong>{t.title}</strong>
            {t.description && <p>{t.description}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
