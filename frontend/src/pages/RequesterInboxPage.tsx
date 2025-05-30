import React, { useEffect, useState } from 'react';
import { getRequesterId } from '../utils/session';


interface ProviderMessage {
  id: string;
  providerId: string;
  serviceName: string;
  response: string;
}

interface BrokerMessage {
  from: string;
  content: string;
  broker: string;
  timestamp: string;
}

export default function RequesterInboxPage() {
  const [providerMessages, setProviderMessages] = useState<ProviderMessage[]>([]);
  const [brokerMessages, setBrokerMessages] = useState<BrokerMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'provider' | 'broker'>('provider');

  useEffect(() => {
    const requesterId = getRequesterId();
  if (!requesterId) return;

    const fetchMessages = async () => {
      try {
        // Provider messages
        const providerRes = await fetch(`http://localhost:3000/api/requester/inbox/${requesterId}`);
        const providerData = await providerRes.json();
        if (Array.isArray(providerData)) {
          setProviderMessages(providerData);
        }

        // Broker messages
        const brokerRes = await fetch(`http://localhost:3000/api/broker/inbox/${requesterId}`);
        const brokerData = await brokerRes.json();
        if (Array.isArray(brokerData)) {
          setBrokerMessages(brokerData);
        }

      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    // Initial load
    fetchMessages();

    // Poll every 10 seconds
    const intervalId = setInterval(fetchMessages, 10000);

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '2rem', background: 'linear-gradient(135deg, #fce4ec, #ffffff)',
      fontFamily: 'Arial'
    }}>
      <h2 style={{ fontSize: '2rem', color: '#c2185b', marginBottom: '1.5rem' }}>📥 Requester Inbox</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => setActiveTab('provider')} style={{
          padding: '0.5rem 1rem',
          backgroundColor: activeTab === 'provider' ? '#c2185b' : '#f8bbd0',
          color: '#fff', border: 'none', borderRadius: '8px'
        }}>
          🧑‍⚕️ Provider Responses
        </button>
        <button onClick={() => setActiveTab('broker')} style={{
          padding: '0.5rem 1rem',
          backgroundColor: activeTab === 'broker' ? '#512da8' : '#d1c4e9',
          color: '#fff', border: 'none', borderRadius: '8px'
        }}>
          🤖 Broker Messages
        </button>
      </div>

      <div style={{ width: '100%', maxWidth: '700px' }}>
        {activeTab === 'provider' && (
          providerMessages.length === 0 ? (
            <p style={{ color: '#757575' }}>No provider responses yet.</p>
          ) : (
            providerMessages.map((msg, i) => (
              <div key={i} style={{
                backgroundColor: '#fff', borderRadius: '12px', padding: '1rem',
                marginBottom: '1rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              }}>
                <h4 style={{ color: '#00796b' }}>Provider ID: {msg.providerId}</h4>
                <p><strong>Service:</strong> {msg.serviceName}</p>
                <p><strong>Response:</strong> {msg.response}</p>
              </div>
            ))
          )
        )}

        {activeTab === 'broker' && (
          brokerMessages.length === 0 ? (
            <p style={{ color: '#757575' }}>No broker messages yet.</p>
          ) : (
            brokerMessages.map((msg, i) => (
              <div key={i} style={{
                backgroundColor: '#e8eaf6', borderRadius: '12px', padding: '1rem',
                marginBottom: '1rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
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
      </div>
    </div>
  );
}
