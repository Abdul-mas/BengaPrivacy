import React, { useEffect, useState } from 'react';

interface Requester {
  id: string;
  privacy: string;
}

export default function RequesterServicePage() {
  const [requesters, setRequesters] = useState<Requester[]>([]);
  const [selectedRequesterId, setSelectedRequesterId] = useState('');
  const [serviceRequest, setServiceRequest] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/requester')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setRequesters(data))
      .catch(err => {
        console.error('Failed to fetch requesters:', err);
        setStatus('❌ Could not load requester list.');
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');

    try {
      const res = await fetch('http://localhost:3000/api/requester/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedRequesterId, req: serviceRequest })
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('✅ Service request submitted successfully.');
        setServiceRequest('');
      } else {
        setStatus(`❌ ${data.error || 'Submission failed.'}`);
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('❌ Network or server error.');
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '2rem', fontFamily: 'Arial', backgroundColor: '#fafafa', minHeight: '100vh'
    }}>
      <h2 style={{ fontSize: '1.8rem', color: '#37474f', marginBottom: '1.5rem' }}>
        📝 Submit a Service Request
      </h2>

      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Select Requester:</label>
          <select
            value={selectedRequesterId}
            onChange={(e) => setSelectedRequesterId(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
          >
            <option value="">-- Choose a requester --</option>
            {requesters.map(r => (
              <option key={r.id} value={r.id}>
                {r.id} ({r.privacy})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Service Request:</label>
          <textarea
            value={serviceRequest}
            onChange={(e) => setServiceRequest(e.target.value)}
            rows={3}
            required
            placeholder="Describe the requested service..."
            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <button
          type="submit"
          disabled={!selectedRequesterId || !serviceRequest}
          style={{
            backgroundColor: !selectedRequesterId || !serviceRequest ? '#ccc' : '#0288d1',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '8px',
            cursor: !selectedRequesterId || !serviceRequest ? 'not-allowed' : 'pointer'
          }}
        >
          🚀 Submit Request
        </button>
      </form>

      {status && (
        <p style={{
          marginTop: '1rem',
          color: status.startsWith('✅') ? 'green' : 'red',
          fontWeight: 500
        }}>
          {status}
        </p>
      )}
    </div>
  );
}
