import React, { useEffect, useState } from 'react';

interface BrokerMessage {
  from: string;
  content: string;
  broker: string;
  timestamp: string;
}

export default function ProviderInboxPage() {
  const [brokerMessages, setBrokerMessages] = useState<BrokerMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'broker' | 'other'>('broker');

  useEffect(() => {
    const providerId = localStorage.getItem('providerId');
    if (!providerId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:3000/inbox/provider/${providerId}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setBrokerMessages(data);
        } else {
          console.error('Unexpected response:', data);
        }
      } catch (error) {
        console.error('Failed to fetch provider inbox:', error);
      }
    };

    fetchMessages();

    const intervalId = setInterval(fetchMessages, 10000); // Poll every 10 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '2rem', background: 'linear-gradient(135deg, #e3f2fd, #ffffff)',
      fontFamily: 'Arial'
    }}>
      <h2 style={{ fontSize: '2rem', color: '#1565c0', marginBottom: '2rem' }}>📥 Provider Inbox</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => setActiveTab('broker')} style={{
          padding: '0.5rem 1rem',
          backgroundColor: activeTab === 'broker' ? '#1565c0' : '#bbdefb',
          color: '#fff', border: 'none', borderRadius: '8px'
        }}>
          🤖 Broker Messages
        </button>
        <button onClick={() => setActiveTab('other')} style={{
          padding: '0.5rem 1rem',
          backgroundColor: activeTab === 'other' ? '#546e7a' : '#cfd8dc',
          color: '#fff', border: 'none', borderRadius: '8px'
        }}>
          📂 Other Messages
        </button>
      </div>

      <div style={{ width: '100%', maxWidth: '700px' }}>
        {activeTab === 'broker' && (
          brokerMessages.length === 0 ? (
            <p style={{ color: '#757575' }}>No broker messages yet.</p>
          ) : (
            brokerMessages.map((msg, i) => (
              <div key={i} style={{
                backgroundColor: '#ffffff', borderRadius: '12px', padding: '1rem',
                marginBottom: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}>
                <p><strong>From:</strong> {msg.from} ({msg.broker})</p>
                <p>{msg.content}</p>
                <p style={{ fontSize: '0.8rem', color: '#757575' }}>
                  {new Date(msg.timestamp).toLocaleString()}
                </p>
              </div>
            ))
          )
        )}

        {activeTab === 'other' && (
          <p style={{ color: '#999' }}>This section is reserved for future provider messages (e.g., from requesters).</p>
        )}
      </div>
    </div>
  );
}
