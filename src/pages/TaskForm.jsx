import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function TaskForm(){
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [dueDate, setDue] = useState('');
  const [priority, setPriority] = useState('Low');
  const nav = useNavigate();
  const [err, setErr] = useState('');

  const submit = async e => {
    e.preventDefault();
    try {
      await api.post('/tasks', { title, description, dueDate, priority });
      nav('/');
    } catch(err) {
      setErr(err.response?.data?.message || 'Error creating');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Create Task</h2>
        {err && <div style={styles.error}>{err}</div>}
        <form onSubmit={submit} style={styles.form}>
          <input
            required
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDesc(e.target.value)}
            style={styles.input}
          />
          <input
            type="date"
            value={dueDate}
            onChange={e => setDue(e.target.value)}
            style={styles.input}
          />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            style={styles.input}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button type="submit" style={styles.button}>Create</button>
        </form>
      </div>
    </div>
  );
}

// CSS-in-JS styles
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
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  }
};
