import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', isError: false });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ text: '', isError: false });
    if (!email.trim() || !password) {
      setMessage({ text: 'Please enter email and password.', isError: true });
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setMessage({ text: 'Signed in successfully.', isError: false });
    } catch (err) {
      setMessage({
        text: err.code === 'auth/invalid-credential' ? 'Invalid email or password.' : err.message,
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMessage({ text: '', isError: false });
    if (!email.trim() || !password) {
      setMessage({ text: 'Please enter email and password.', isError: true });
      return;
    }
    if (password.length < 6) {
      setMessage({ text: 'Password should be at least 6 characters.', isError: true });
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      setMessage({ text: 'Account created. You are signed in.', isError: false });
    } catch (err) {
      setMessage({
        text: err.code === 'auth/email-already-in-use' ? 'This email is already in use.' : err.message,
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h1 style={styles.title}>FieldPorter</h1>
      <p style={styles.subtitle}>Sign in or create an account</p>

      <form onSubmit={handleLogin} style={styles.form}>
        <label style={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          style={styles.input}
          disabled={loading}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          style={styles.input}
          disabled={loading}
        />

        {message.text && (
          <p
            style={{
              ...styles.message,
              color: message.isError ? '#f87171' : '#86efac',
            }}
          >
            {message.text}
          </p>
        )}

        <div style={styles.buttons}>
          <button
            type="submit"
            onClick={handleLogin}
            disabled={loading}
            style={styles.primaryBtn}
          >
            {loading ? 'Please wait…' : 'Login'}
          </button>
          <button
            type="button"
            onClick={handleSignUp}
            disabled={loading}
            style={styles.secondaryBtn}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  card: {
    background: '#1e293b',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  title: {
    margin: '0 0 0.25rem',
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#f8fafc',
  },
  subtitle: {
    margin: '0 0 1.5rem',
    fontSize: '0.9rem',
    color: '#94a3b8',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#cbd5e1',
  },
  input: {
    padding: '0.6rem 0.75rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #334155',
    background: '#0f172a',
    color: '#e2e8f0',
    outline: 'none',
  },
  message: {
    margin: 0,
    fontSize: '0.875rem',
  },
  buttons: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '0.5rem',
  },
  primaryBtn: {
    flex: 1,
    padding: '0.65rem 1rem',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#0f172a',
    background: '#38bdf8',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  secondaryBtn: {
    flex: 1,
    padding: '0.65rem 1rem',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#e2e8f0',
    background: 'transparent',
    border: '1px solid #475569',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default Login;
