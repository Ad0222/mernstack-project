import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';
import TaskDetails from './pages/TaskDetails';
import EditTask from './pages/EditTask';
import { getToken, logout, getUser } from './utils/auth';

export default function App() {
  const navigate = useNavigate();
  const token = getToken();
  const user = getUser();

  return (
    <div>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        {/* Logo */}
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}></div>
          <span style={styles.logoText}>TaskBase</span>
        </div>

        {/* Right side links */}
        <div style={styles.authSection}>
          <Link to="/" style={styles.link}>Tasks</Link>
          {token && <Link to="/create" style={styles.link}>Create</Link>}
          {!token ? (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.link}>Register</Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              style={styles.logoutButton}
            >
              Logout ({user?.name})
            </button>
          )}
        </div>
      </nav>

      {/* ROUTES */}
      <main style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<TaskForm />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/tasks/:id/edit" element={<EditTask />} />
        </Routes>
      </main>
    </div>
  );
}

// -------------------
// STYLES
const styles = {
  navbar: {
    backgroundColor: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 20,
    height: 20,
    background: 'linear-gradient(to right, #f87171, #8b5cf6)',
    borderRadius: 4,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  authSection: {
    display: 'flex',
    gap: 20,
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#111827',
    fontWeight: 500,
    fontSize: 15,
  },
  logoutButton: {
    backgroundColor: '#7c3aed',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: 999,
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer',
  },
};
