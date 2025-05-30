import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ASAS Inc..webp';
import logo2 from '../assets/BengaPrivacy Logo.png';

import { clearRequesterId, clearProviderId } from '../utils/session';


export default function HomePage() {
  const navigate = useNavigate();

  const buttonStyle: React.CSSProperties = {
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  borderRadius: '8px',
  cursor: 'pointer',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  width: '260px',
  textAlign: 'center', // Valid here now
};

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #e0f7fa, #ffffff)',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '2rem 1rem',
        boxSizing: 'border-box'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        padding: '1rem 2rem',
        position: 'absolute',
        top: 0,
        left: 0,
      }}>
        <a href="https://asasit.co" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="ASAS Logo" style={{ width: '60px', height: 'auto', marginRight: '1rem' }} />
        </a>
        <span style={{
          fontSize: '1.25rem',
          fontWeight: 500,
          color: '#004d40',
          fontFamily: 'Arial, sans-serif'
        }}>
          Applied Software & Automated Solutions
        </span>
      </div>

      <img src={logo2} alt="BengaPrivacy Logo" style={{ width: '100px', marginBottom: '1rem' }} />

      <h1 style={{ fontSize: '3rem', color: '#00796b' }}>Benga</h1>

      <p style={{ fontSize: '1.25rem', color: '#004d40', margin: '1rem 0 2rem' }}>
        Privacy Protection Platform
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button onClick={() => navigate('/register')} style={{ ...buttonStyle, backgroundColor: '#00796b', color: '#ffffff' }}>
          📝 Register
        </button>

        <button onClick={() => navigate('/request')} style={{ ...buttonStyle, backgroundColor: '#e0f2f1', color: '#00796b', border: '2px solid #00796b' }}>
          💼 Request Service
        </button>

        <button onClick={() => navigate('/submitted-requests')} style={{ ...buttonStyle, backgroundColor: '#fff3e0', color: '#e65100' }}>
          📄 View Submitted Requests
        </button>

        <button onClick={() => navigate('/provider/requests')} style={{ ...buttonStyle, backgroundColor: '#ede7f6', color: '#4527a0' }}>
          🧑‍⚕️ Provider: Browse Requests
        </button>

        <button onClick={() => navigate('/requester-inbox')} style={{ ...buttonStyle, backgroundColor: '#fce4ec', color: '#c2185b' }}>
          📥 Requester Inbox
        </button>

        <button onClick={() => navigate('/provider-inbox')} style={{ ...buttonStyle, backgroundColor: '#e1f5fe', color: '#0277bd' }}>
          📬 Provider Inbox
        </button>

        <button
  onClick={() => {
    clearRequesterId();
    clearProviderId();
    navigate('/');
  }}
  style={{
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '8px',
    backgroundColor: '#ffcdd2',
    color: '#b71c1c',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1rem'
  }}
>
  🚪 Logout
</button>
      </div>
    </div>
  );
}
