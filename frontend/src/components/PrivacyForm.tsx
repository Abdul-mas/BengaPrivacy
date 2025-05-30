import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Role = 'requester' | 'provider';
type Mode = 'register' | 'request';

const privacyOptions: Record<Role, string[]> = {
  requester: ['reveal_both', 'hide_id', 'hide_req', 'hide_both'],
  provider: ['reveal_both', 'hide_id', 'hide_ser', 'hide_both'],
};

export default function PrivacyForm() {
  const [role, setRole] = useState<Role>('requester');
  const [mode, setMode] = useState<Mode>('register');
  const [id, setId] = useState('');
  const [privacy, setPrivacy] = useState('reveal_both');
  const [reqText, setReqText] = useState(''); // <- request content
  const [response, setResponse] = useState<any>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (role === 'provider') {
        const providerPayload = { id, privacy };
        const res = await fetch('http://localhost:3000/api/provider', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(providerPayload),
        });
        const json = await res.json();
        setResponse(json);
        if (!json.error) navigate(`/provider/${id}/services`);
        return;
      }

      if (mode === 'register') {
        const registerPayload = { id, privacy };
        const res = await fetch('http://localhost:3000/api/requester', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registerPayload),
        });
        const json = await res.json();
        setResponse(json);
        if (!json.error) navigate(`/requester/${id}/request`);
      }

      if (mode === 'request') {
        const matchPayload = { id, req: reqText, privacy };
        const res = await fetch('http://localhost:3000/api/matching', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(matchPayload),
        });
        const json = await res.json();
        setResponse(json);
      }
    } catch (err) {
      console.error('Error:', err);
      setResponse({ error: 'Operation failed.' });
    }
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', backgroundColor: '#f4f4f4'
    }}>
      <div className="form-container" style={{
        background: '#fff', padding: '2rem', borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center' }}>
          {role === 'provider' ? 'Provider Registration' :
            mode === 'register' ? 'Requester Registration' : 'Request Service'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label>
            Role:
            <select value={role} onChange={e => {
              setRole(e.target.value as Role);
              setMode('register');
            }}>
              <option value="requester">Requester</option>
              <option value="provider">Provider</option>
            </select>
          </label>

          {role === 'requester' && (
            <label>
              Mode:
              <select value={mode} onChange={e => setMode(e.target.value as Mode)}>
                <option value="register">Register</option>
                <option value="request">Request Service</option>
              </select>
            </label>
          )}

          <label>ID:
            <input type="text" value={id} onChange={e => setId(e.target.value)} />
          </label>

          <label>Privacy Degree:
            <select value={privacy} onChange={e => setPrivacy(e.target.value)}>
              {privacyOptions[role].map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>

          {role === 'requester' && mode === 'request' && (
            <label>Service Request:
              <input type="text" value={reqText} onChange={e => setReqText(e.target.value)} />
            </label>
          )}

          <button type="submit">{mode === 'request' ? 'Match Provider' : 'Submit'}</button>
        </form>

        {response && (
          <div className="response-box" style={{ marginTop: '1rem' }}>
            {response.error ? (
              <div style={{ color: 'red' }}>❌ {response.error}</div>
            ) : (
              <>
                ✅ <strong>Matched Provider:</strong> {response.match}<br />
                🔢 <strong>Score:</strong> {response.score}<br />
                🤝 <strong>Broker:</strong> {response.broker}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
