import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

function colorForPriority(p){
  if(p==='High') return '#ffcccc';
  if(p==='Medium') return '#fff3cd';
  return '#d4edda';
}

export default function TaskList(){
  const [page, setPage] = useState(1);
  const [tasksData, setTasksData] = useState({ tasks: [], totalPages: 1 });

  const fetchTasks = async () => {
    const res = await api.get('/tasks', { params: { page } });
    setTasksData(res.data);
  };

  useEffect(()=>{ fetchTasks(); }, [page]);

  const deleteTask = async (id) => {
    if(!window.confirm('Delete task?')) return;
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const toggleStatus = async (t) => {
    const newStatus = t.status === 'pending' ? 'completed' : 'pending';
    await api.patch(`/tasks/${t._id}/status`, { status: newStatus });
    fetchTasks();
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.heading}>Tasks</h2>

        <div style={styles.grid}>
          {tasksData.tasks.map(t => (
            <div key={t._id} style={{ ...styles.card, background: colorForPriority(t.priority) }}>
              <h3>
                <Link to={`/tasks/${t._id}`} style={styles.link}>{t.title}</Link>
              </h3>
              <div>Due: {t.dueDate ? format(new Date(t.dueDate), 'yyyy-MM-dd') : '—'}</div>
              <div>Status: {t.status}</div>
              <div>Priority: {t.priority}</div>
              <div style={styles.actions}>
                <button onClick={() => toggleStatus(t)}>{t.status === 'pending' ? 'Mark Complete' : 'Mark Pending'}</button>
                <Link to={`/tasks/${t._id}/edit`}><button>Edit</button></Link>
                <button onClick={() => deleteTask(t._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.pagination}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}>Prev</button>
          <span> Page {tasksData.page} / {tasksData.totalPages} </span>
          <button onClick={() => setPage(p => Math.min(tasksData.totalPages, p + 1))} disabled={page >= tasksData.totalPages}>Next</button>
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
    alignItems: 'start',
    paddingTop: 30,
  },
  box: {
    width: '100%',
    maxWidth: '1000px',
  },
  heading: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '16px',
  },
  card: {
    padding: 16,
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  link: {
    textDecoration: 'none',
    color: '#1f2937',
  },
  actions: {
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  pagination: {
    marginTop: 20,
    textAlign: 'center',
  }
};
