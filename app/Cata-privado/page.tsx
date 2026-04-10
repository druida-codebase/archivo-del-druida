'use client';

import Form from '@/components/Form';
import { ReportType, emptyTeaReport } from '@/components/schemas';
import { useState, useEffect } from 'react';

const SESSION_DURATION = 21600000;

export default function Page() {
  const [draft, setDraft] = useState<ReportType>(emptyTeaReport);
  const [status, setStatus] = useState<'loading' | 'active' | 'locked'>('loading');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/auth')
      .then(r => r.json())
      .then(({ active }) => setStatus(active ? 'active' : 'locked'));
  }, []);

  const handleLogin = async () => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, password }),
    });
    const { ok } = await res.json();
    if (ok) {
      setStatus('active');
    } else {
      setError('Credenciales incorrectas.');
    }
  };

  if (status === 'loading') return <p>Cargando...</p>;

  if (status === 'locked') {
    return (
      <div style={{position: "absolute", top: "20dvh", left: "20dvw"}}>
        <input
          type="text"
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        />
        <button onClick={handleLogin}>Entrar</button>
        {error && <p>{error}</p>}
      </div>
    );
  }

  return <Form draft={draft} setDraft={setDraft} />;
}