import React, { useState } from 'react';
import logo from '../assets/ASAS Inc..webp'

interface MatchResult {
  match: string;
  score: number;
  broker: string;
}

export default function RequesterDashboardPage() {
  const [request, setRequest] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<MatchResult | null>(null);
  const requesterId = localStorage.getItem('requesterId');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setResult(null);

    if (!request || !requesterId) {
      setMessage('❌ Request is required.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/requester', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: requesterId, req: request }),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setMessage(`❌ ${data.error || 'No match found'}`);
      }
    } catch (error) {
      console.error('Service request error:', error);
      setMessage('❌ Server error.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4f8, #ffffff)',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '2rem'
    }}>

      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        <img src={logo} alt="ASAS Logo" style={{ width: '80px', marginRight: '1rem' }} />
        <h1 style={{ fontSize: '1.5rem', color: '#00796b' }}>BengaPrivacy</h1>
      </header>
      
      <h2 style={{ color: '#3f51b5', marginBottom: '1rem' }}>Service Request</h2>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        minWidth: '300px'
      }}>
        <input
          type="text"
          placeholder="Enter your request (e.g., Diagnosis)"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          style={{
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#3f51b5',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Submit Request
        </button>
        {message && <div style={{ color: '#d32f2f', marginTop: '1rem' }}>{message}</div>}
        {result && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#e8f5e9',
            border: '1px solid #c8e6c9',
            borderRadius: '8px'
          }}>
            <p><strong>Matched Provider:</strong> {result.match}</p>
            <p><strong>Score:</strong> {result.score}</p>
            <p><strong>Broker:</strong> {result.broker}</p>
          </div>
        )}
      </form>
    </div>
  );
}
