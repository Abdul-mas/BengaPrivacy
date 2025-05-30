import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export default function ProviderInboxPage() {
    const [brokerMessages, setBrokerMessages] = useState([]);
    const [activeTab, setActiveTab] = useState('broker');
    useEffect(() => {
        const providerId = localStorage.getItem('providerId');
        if (!providerId)
            return;
        const fetchMessages = async () => {
            try {
                const res = await fetch(`http://localhost:3000/inbox/provider/${providerId}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setBrokerMessages(data);
                }
                else {
                    console.error('Unexpected response:', data);
                }
            }
            catch (error) {
                console.error('Failed to fetch provider inbox:', error);
            }
        };
        fetchMessages();
        const intervalId = setInterval(fetchMessages, 10000); // Poll every 10 seconds
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);
    return (_jsxs("div", { style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '2rem', background: 'linear-gradient(135deg, #e3f2fd, #ffffff)',
            fontFamily: 'Arial'
        }, children: [_jsx("h2", { style: { fontSize: '2rem', color: '#1565c0', marginBottom: '2rem' }, children: "\uD83D\uDCE5 Provider Inbox" }), _jsxs("div", { style: { display: 'flex', gap: '1rem', marginBottom: '2rem' }, children: [_jsx("button", { onClick: () => setActiveTab('broker'), style: {
                            padding: '0.5rem 1rem',
                            backgroundColor: activeTab === 'broker' ? '#1565c0' : '#bbdefb',
                            color: '#fff', border: 'none', borderRadius: '8px'
                        }, children: "\uD83E\uDD16 Broker Messages" }), _jsx("button", { onClick: () => setActiveTab('other'), style: {
                            padding: '0.5rem 1rem',
                            backgroundColor: activeTab === 'other' ? '#546e7a' : '#cfd8dc',
                            color: '#fff', border: 'none', borderRadius: '8px'
                        }, children: "\uD83D\uDCC2 Other Messages" })] }), _jsxs("div", { style: { width: '100%', maxWidth: '700px' }, children: [activeTab === 'broker' && (brokerMessages.length === 0 ? (_jsx("p", { style: { color: '#757575' }, children: "No broker messages yet." })) : (brokerMessages.map((msg, i) => (_jsxs("div", { style: {
                            backgroundColor: '#ffffff', borderRadius: '12px', padding: '1rem',
                            marginBottom: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }, children: [_jsxs("p", { children: [_jsx("strong", { children: "From:" }), " ", msg.from, " (", msg.broker, ")"] }), _jsx("p", { children: msg.content }), _jsx("p", { style: { fontSize: '0.8rem', color: '#757575' }, children: new Date(msg.timestamp).toLocaleString() })] }, i))))), activeTab === 'other' && (_jsx("p", { style: { color: '#999' }, children: "This section is reserved for future provider messages (e.g., from requesters)." }))] })] }));
}
