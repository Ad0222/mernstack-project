import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function TaskDetails(){
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    api.get(`/tasks/${id}`).then(res => setTask(res.data));
  }, [id]);

  const del = async () => {
    if (!window.confirm('Delete task?')) return;
    await api.delete(`/tasks/${id}`);
    nav('/');
  };

  if (!task) return <div style={{ textAlign: 'center', marginTop: 50 }}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>{task.title}</h2>
        <div><strong>Description:</strong> {task.description || '—'}</div>
        <div><strong>Due Date:</strong> {task.dueDate ? task.dueDate.split('T')[0] : '—'}</div>
        <div><strong>Priority:</strong> {task.priority}</div>
        <div><strong>Status:</strong> {task.status}</div>
        <div style={styles.actions}>
          <Link to={`/tasks/${id}/edit`}><button>Edit</button></Link>
          <button onClick={del}>Delete</button>
        </div>
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
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 8,
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    maxWidth: 500,
    width: '100%',
  },
  title: {
    marginBottom: 16,
  },
  actions: {
    marginTop: 20,
    display: 'flex',
    gap: 12,
  }
};
