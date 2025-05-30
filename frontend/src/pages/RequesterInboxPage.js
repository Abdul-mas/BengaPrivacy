import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { getRequesterId } from '../utils/session';
export default function RequesterInboxPage() {
    const [providerMessages, setProviderMessages] = useState([]);
    const [brokerMessages, setBrokerMessages] = useState([]);
    const [activeTab, setActiveTab] = useState('provider');
    useEffect(() => {
        const requesterId = getRequesterId();
        if (!requesterId)
            return;
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
            }
            catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };
        // Initial load
        fetchMessages();
        // Poll every 10 seconds
        const intervalId = setInterval(fetchMessages, 10000);
        return () => clearInterval(intervalId); // Cleanup
    }, []);
    return (_jsxs("div", { style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '2rem', background: 'linear-gradient(135deg, #fce4ec, #ffffff)',
            fontFamily: 'Arial'
        }, children: [_jsx("h2", { style: { fontSize: '2rem', color: '#c2185b', marginBottom: '1.5rem' }, children: "\uD83D\uDCE5 Requester Inbox" }), _jsxs("div", { style: { display: 'flex', gap: '1rem', marginBottom: '2rem' }, children: [_jsx("button", { onClick: () => setActiveTab('provider'), style: {
                            padding: '0.5rem 1rem',
                            backgroundColor: activeTab === 'provider' ? '#c2185b' : '#f8bbd0',
                            color: '#fff', border: 'none', borderRadius: '8px'
                        }, children: "\uD83E\uDDD1\u200D\u2695\uFE0F Provider Responses" }), _jsx("button", { onClick: () => setActiveTab('broker'), style: {
                            padding: '0.5rem 1rem',
                            backgroundColor: activeTab === 'broker' ? '#512da8' : '#d1c4e9',
                            color: '#fff', border: 'none', borderRadius: '8px'
                        }, children: "\uD83E\uDD16 Broker Messages" })] }), _jsxs("div", { style: { width: '100%', maxWidth: '700px' }, children: [activeTab === 'provider' && (providerMessages.length === 0 ? (_jsx("p", { style: { color: '#757575' }, children: "No provider responses yet." })) : (providerMessages.map((msg, i) => (_jsxs("div", { style: {
                            backgroundColor: '#fff', borderRadius: '12px', padding: '1rem',
                            marginBottom: '1rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        }, children: [_jsxs("h4", { style: { color: '#00796b' }, children: ["Provider ID: ", msg.providerId] }), _jsxs("p", { children: [_jsx("strong", { children: "Service:" }), " ", msg.serviceName] }), _jsxs("p", { children: [_jsx("strong", { children: "Response:" }), " ", msg.response] })] }, i))))), activeTab === 'broker' && (brokerMessages.length === 0 ? (_jsx("p", { style: { color: '#757575' }, children: "No broker messages yet." })) : (brokerMessages.map((msg, i) => (_jsxs("div", { style: {
                            backgroundColor: '#e8eaf6', borderRadius: '12px', padding: '1rem',
                            marginBottom: '1rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        }, children: [_jsxs("p", { children: [_jsx("strong", { children: "From:" }), " ", msg.from, " (", msg.broker, ")"] }), _jsx("p", { children: msg.content }), _jsx("p", { style: { fontSize: '0.8rem', color: '#757575' }, children: new Date(msg.timestamp).toLocaleString() })] }, i)))))] })] }));
}
