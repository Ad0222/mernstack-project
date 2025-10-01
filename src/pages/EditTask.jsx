import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditTask() {
  const { id } = useParams();
  const nav = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [dueDate, setDue] = useState('');
  const [priority, setPriority] = useState('Low');

  useEffect(() => {
    api.get(`/tasks/${id}`).then(res => {
      setTitle(res.data.title);
      setDesc(res.data.description || '');
      setDue(res.data.dueDate ? res.data.dueDate.split('T')[0] : '');
      setPriority(res.data.priority);
    });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    await api.put(`/tasks/${id}`, { title, description, dueDate, priority });
    nav(`/tasks/${id}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Edit Task</h2>
        <form onSubmit={submit} style={styles.form}>
          <input value={title} onChange={e => setTitle(e.target.value)} required style={styles.input} />
          <textarea value={description} onChange={e => setDesc(e.target.value)} style={styles.input} />
          <input type="date" value={dueDate} onChange={e => setDue(e.target.value)} style={styles.input} />
          <select value={priority} onChange={e => setPriority(e.target.value)} style={styles.input}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button type="submit" style={styles.button}>Save</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '100%',
    maxWidth: '500px',
    padding: '30px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  }
};
