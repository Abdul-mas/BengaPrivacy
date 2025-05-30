import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo  from "../assets/ASAS Inc..webp";

export default function RequesterRegistrationPage() {
  const [id, setId] = useState('');
  const [privacy, setPrivacy] = useState('reveal_both');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!id.trim() || !privacy.trim()) {
      setMessage('❌ All fields are required.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/requester', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, privacy })
      });

      const resData = await res.json();

      if (res.ok) {
        // ✅ Store requester info in localStorage
        localStorage.setItem('requesterId', resData.id);
        localStorage.setItem('requesterPrivacy', resData.privacy);

        navigate('/');
      } else {
        setMessage(`❌ ${resData.error || 'Registration failed'}`);
      }
    } catch (err) {
      setMessage('❌ Server error');
      console.error('Requester registration error:', err);
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
      <h2 style={{ color: '#6a1b9a', marginBottom: '1.5rem', fontSize: '2rem' }}>Register as Requester</h2>
      
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        <img src={logo} alt="ASAS Logo" style={{ width: '80px', marginRight: '1rem' }} />
        <h1 style={{ fontSize: '1.5rem', color: '#00796b' }}>BengaPrivacy</h1>
      </header>
      
      <form onSubmit={handleSubmit} style={{
        display: 'flex', flexDirection: 'column', gap: '1rem',
        backgroundColor: '#ffffff', padding: '2rem 3rem',
        borderRadius: '16px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        width: '100%', maxWidth: '400px'
      }}>
        <input
          type="text"
          placeholder="Enter Requester ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{
            padding: '0.75rem', fontSize: '1rem',
            border: '1px solid #ccc', borderRadius: '8px'
          }}
        />
        <select
          value={privacy}
          onChange={(e) => setPrivacy(e.target.value)}
          style={{
            padding: '0.75rem', fontSize: '1rem',
            border: '1px solid #ccc', borderRadius: '8px'
          }}
        >
          <option value="reveal_both">Reveal Both</option>
          <option value="hide_id">Hide ID</option>
          <option value="hide_req">Hide Request</option>
          <option value="hide_both">Hide Both</option>
        </select>
        <button
          type="submit"
          style={{
            padding: '0.75rem', fontSize: '1rem',
            backgroundColor: '#6a1b9a', color: '#fff',
            border: 'none', borderRadius: '8px', cursor: 'pointer'
          }}
        >
          Register
        </button>
        {message && <div style={{ color: message.startsWith('✅') ? '#388e3c' : '#d32f2f', marginTop: '1rem' }}>{message}</div>}
      </form>
    </div>
  );
}
