import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ASAS Inc..webp'
export default function ProviderRegistrationPage() {
  const [id, setId] = useState('');
  const [privacy, setPrivacy] = useState('reveal_both');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!id || !privacy) {
      setMessage('❌ All fields are required.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/provider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, privacy }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('providerId', id); // store ID
        navigate('/provider/service');
      } else {
        setMessage(`❌ ${data.error || 'Registration failed'}`);
      }
    } catch (error) {
      setMessage(`❌ Server error`);
      console.error('Provider registration error:', error);
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


      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        <img src={logo} alt="ASAS Logo" style={{ width: '80px', marginRight: '1rem' }} />
        <h1 style={{ fontSize: '1.5rem', color: '#00796b' }}>BengaPrivacy</h1>
      </header>

      <h2 style={{ color: '#00796b', marginBottom: '1rem' }}>Provider Registration</h2>
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
          placeholder="Enter your ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px'
          }}
        />
        <select
          value={privacy}
          onChange={(e) => setPrivacy(e.target.value)}
          style={{
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px'
          }}
        >
          <option value="reveal_both">Reveal Both</option>
          <option value="hide_id">Hide ID</option>
          <option value="hide_ser">Hide Service</option>
          <option value="hide_both">Hide Both</option>
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
          Register
        </button>
        {message && <div style={{ color: '#d32f2f', marginTop: '1rem' }}>{message}</div>}
      </form>
    </div>
  );
}
