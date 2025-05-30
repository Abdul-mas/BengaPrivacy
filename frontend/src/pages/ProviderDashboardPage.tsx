import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ASAS Inc..webp';


interface ProviderService {
  name: string;
  cost: number;
  resultFormat: string;
}

export default function ProviderDashboardPage() {
  const [services, setServices] = useState<ProviderService[]>([]);
  const [error, setError] = useState('');
  const providerId = localStorage.getItem('providerId');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`http://localhost:3000/api/provider/service/${providerId}`);
        const data = await res.json();

        if (res.ok) {
          setServices(data);
        } else {
          setError(data.error || 'Failed to fetch services');
        }
      } catch (err) {
        console.error('Error loading services:', err);
        setError('❌ Server error');
      }
    }

    if (providerId) {
      fetchServices();
    }
  }, [providerId]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f5f5, #e0f7fa)',
      fontFamily: 'Arial, sans-serif',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        <img src={logo} alt="ASAS Logo" style={{ width: '80px', marginRight: '1rem' }} />
        <h1 style={{ fontSize: '1.5rem', color: '#00796b' }}>BengaPrivacy</h1>
      </header>
      
      <h2 style={{ color: '#00695c', marginBottom: '1rem' }}>Provider Dashboard</h2>
      <p style={{ marginBottom: '1rem' }}>ID: <strong>{providerId}</strong></p>

      <button
        onClick={() => navigate('/provider/service')}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#00796b',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '2rem'
        }}
      >
        Add New Service
      </button>

      {error && <p style={{ color: '#d32f2f' }}>{error}</p>}

      {services.length > 0 ? (
        <div style={{ maxWidth: '500px', width: '100%' }}>
          {services.map((service, idx) => (
            <div key={idx} style={{
              backgroundColor: '#ffffff',
              marginBottom: '1rem',
              padding: '1rem',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <p><strong>Name:</strong> {service.name}</p>
              <p><strong>Cost:</strong> ${service.cost}</p>
              <p><strong>Format:</strong> {service.resultFormat}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No services registered yet.</p>
      )}
    </div>
  );
}
