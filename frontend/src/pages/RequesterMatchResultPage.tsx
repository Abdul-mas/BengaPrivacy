import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from  "../assets/ASAS Inc..webp";

interface MatchResult {
  match: string;
  score: number;
  broker: string;
}

export default function RequesterMatchResultPage() {
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const requesterId = localStorage.getItem('requesterId');

  useEffect(() => {
    async function fetchMatch() {
      try {
        const res = await fetch(`http://localhost:3000/api/match`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: requesterId })
        });

        const data = await res.json();
        if (res.ok) {
          setResult(data);
        } else {
          setError(data.error || 'Matching failed');
        }
      } catch (err) {
        console.error('Match fetch error:', err);
        setError('❌ Server error');
      }
    }

    if (requesterId) {
      fetchMatch();
    } else {
      setError('Requester ID not found. Please register.');
    }
  }, [requesterId]);

  return (
    <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100vw', // ensures full width
    background: 'linear-gradient(135deg, #e0f7fa, #ffffff)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '2rem 1rem',
    boxSizing: 'border-box' // important to avoid overflow
  }}
>


      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        <img src={logo} alt="ASAS Logo" style={{ width: '80px', marginRight: '1rem' }} />
        <h1 style={{ fontSize: '1.5rem', color: '#00796b' }}>BengaPrivacy</h1>
      </header>

      <h2 style={{ color: '#00796b', marginBottom: '1.5rem' }}>Match Result</h2>

      {error && <p style={{ color: '#d32f2f' }}>{error}</p>}

      {result && (
        <div style={{
          backgroundColor: '#ffffff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          minWidth: '320px'
        }}>
          <p><strong>Matched Provider:</strong> {result.match}</p>
          <p><strong>Score:</strong> {result.score}</p>
          <p><strong>Broker:</strong> {result.broker}</p>
        </div>
      )}

      <button
        onClick={() => navigate('/request')}
        style={{
          marginTop: '1.5rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#00796b',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Back to Request
      </button>
    </div>
  );
}
