import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/ASAS Inc..webp';

const serviceNames = ['Diagnosis', 'Treatment', 'Medication'];
const resultFormats = ['Text', 'PDF'];

export default function ProviderServicePage() {
  const { providerId } = useParams();
  const [service, setService] = useState(serviceNames[0]);
  const [cost, setCost] = useState('');
  const [format, setFormat] = useState(resultFormats[0]);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      providerId,
      name: service,
      cost: parseFloat(cost),
      resultFormat: format,
    };

    try {
      const res = await fetch('http://localhost:3000/api/provider/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      setMessage(json.error ? `❌ ${json.error}` : '✅ Service added successfully');
    } catch (err) {
      console.error('Error adding service:', err);
      setMessage('❌ Failed to add service');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2>Add Service for Provider: {providerId}</h2>

      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        <img src={logo} alt="ASAS Logo" style={{ width: '80px', marginRight: '1rem' }} />
        <h1 style={{ fontSize: '1.5rem', color: '#00796b' }}>BengaPrivacy</h1>
      </header>


      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label>
          Service Name:
          <select value={service} onChange={(e) => setService(e.target.value)}>
            {serviceNames.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>

        <label>
          Cost:
          <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} required />
        </label>

        <label>
          Result Format:
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            {resultFormats.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </label>

        <button type="submit">Add Service</button>
      </form>

      {message && <div style={{ marginTop: '1rem' }}>{message}</div>}
    </div>
  );
}
