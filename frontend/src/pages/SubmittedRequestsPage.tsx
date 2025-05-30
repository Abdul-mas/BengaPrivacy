import React, { useEffect, useState } from 'react';

interface SubmittedRequest {
  id: string;
  privacy: string;
  req: string;
}

export default function SubmittedRequestsPage() {
  const [requests, setRequests] = useState<SubmittedRequest[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/requester/submitted')
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setRequests(data) : setError('Unexpected response.'))
      .catch(() => setError('Could not fetch submitted requests.'));
  }, []);

  return (
    <div style={{
      padding: '2rem', fontFamily: 'Arial', backgroundColor: '#fafafa', minHeight: '100vh'
    }}>
      <h2 style={{ color: '#37474f' }}>📄 Submitted Service Requests</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {requests.length === 0 ? (
        <p>No requests have been submitted yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {requests.map((r, idx) => (
            <li key={idx} style={{
              backgroundColor: '#fff', borderRadius: '8px',
              padding: '1rem', marginBottom: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <strong>Requester:</strong> {r.id} <br />
              <strong>Privacy:</strong> {r.privacy} <br />
              <strong>Request:</strong> {r.req}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
