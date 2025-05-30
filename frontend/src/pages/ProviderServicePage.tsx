import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ASAS Inc..webp'

export default function ProviderServicePage() {
  const [name, setName] = useState('Diagnosis');
  const [cost, setCost] = useState('');
  const [resultFormat, setResultFormat] = useState('Text');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const providerId = localStorage.getItem('providerId');
    if (!providerId || !name.trim() || !cost.trim() || !resultFormat.trim()) {
      setMessage('❌ All fields are required.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/provider/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId, name, cost, resultFormat })
      });

      const data = await res.json();
      if (res.ok) {
        navigate('/');
      } else {
        setMessage(`❌ ${data.error || 'Service registration failed'}`);
      }
    } catch (error) {
      setMessage('❌ Server error');
      console.error('Service registration error:', error);
    }
  };

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

      <h2 style={{ color: '#00796b', marginBottom: '1.5rem', fontSize: '2rem' }}>Describe Your Service</h2>
      
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        <img src={logo} alt="ASAS Logo" style={{ width: '80px', marginRight: '1rem' }} />
        <h1 style={{ fontSize: '1.5rem', color: '#00796b' }}>BengaPrivacy</h1>
      </header>

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: '#ffffff',
        padding: '2rem 3rem',
        borderRadius: '16px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <select
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px'
          }}
        >
          <option value="Diagnosis">Diagnosis</option>
          <option value="Treatment">Treatment</option>
          <option value="Medication">Medication</option>
        </select>
        <input
          type="text"
          placeholder="Enter cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          style={{
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px'
          }}
        />
        <select
          value={resultFormat}
          onChange={(e) => setResultFormat(e.target.value)}
          style={{
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px'
          }}
        >
          <option value="Text">Text</option>
          <option value="PDF">PDF</option>
        </select>
        <button
          type="submit"
          style={{
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#00796b',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
        {message && <div style={{ color: '#d32f2f', marginTop: '1rem' }}>{message}</div>}
      </form>
    </div>
  );
}
