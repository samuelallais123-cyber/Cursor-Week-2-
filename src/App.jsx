import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import Login from './Login.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [testText, setTestText] = useState('');
  const [saveStatus, setSaveStatus] = useState({ text: '', isError: false });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSaveTestText = async () => {
    setSaveStatus({ text: '', isError: false });
    if (!testText.trim()) {
      setSaveStatus({ text: 'Please enter some text to save.', isError: true });
      return;
    }
    try {
      await addDoc(collection(db, 'test'), {
        text: testText.trim(),
        createdAt: serverTimestamp(),
        uid: user ? user.uid : null,
      });
      setTestText('');
      setSaveStatus({ text: 'Saved to Firestore test collection.', isError: false });
    } catch (err) {
      setSaveStatus({ text: err.message, isError: true });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      // optional: surface logout error in UI later if desired
      console.error('Error signing out:', err);
    }
  };

  return (
    <main style={styles.main}>
      {user ? (
        <section style={styles.card}>
          <h1 style={styles.title}>Welcome to FieldPorter</h1>
          <p style={styles.subtitle}>
            You are signed in. Test saving to Firestore below.
          </p>

          <div style={styles.form}>
            <label style={styles.label}>Test text to save to Firestore</label>
            <input
              type="text"
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              placeholder="Type anything here..."
              style={styles.input}
            />
            <button
              type="button"
              onClick={handleSaveTestText}
              style={styles.primaryBtn}
            >
              Save
            </button>

            {saveStatus.text && (
              <p
                style={{
                  ...styles.message,
                  color: saveStatus.isError ? '#f87171' : '#86efac',
                }}
              >
                {saveStatus.text}
              </p>
            )}
          </div>

          <button type="button" onClick={handleLogout} style={styles.logoutBtn}>
            Log Out
          </button>
        </section>
      ) : (
        <Login />
      )}
    </main>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#020617',
    color: '#e2e8f0',
    padding: '1.5rem',
  },
  card: {
    background: '#1e293b',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    maxWidth: '480px',
    width: '100%',
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
  primaryBtn: {
    padding: '0.65rem 1rem',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#0f172a',
    background: '#38bdf8',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  logoutBtn: {
    marginTop: '1.5rem',
    width: '100%',
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

export default App;
