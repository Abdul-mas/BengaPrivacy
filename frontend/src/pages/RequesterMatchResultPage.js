import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/ASAS Inc..webp";
export default function RequesterMatchResultPage() {
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const requesterId = localStorage.getItem('requesterId');
    useEffect(() => {
        async function fetchMatch() {
            try {
                const res = await fetch(`http://localhost:3000/api/match`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: requesterId })
                });
                const data = await res.json();
                if (res.ok) {
                    setResult(data);
                }
                else {
                    setError(data.error || 'Matching failed');
                }
            }
            catch (err) {
                console.error('Match fetch error:', err);
                setError('❌ Server error');
            }
        }
        if (requesterId) {
            fetchMatch();
        }
        else {
            setError('Requester ID not found. Please register.');
        }
    }, [requesterId]);
    return (_jsxs("div", { style: {
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
        }, children: [_jsxs("header", { style: { display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }, children: [_jsx("img", { src: logo, alt: "ASAS Logo", style: { width: '80px', marginRight: '1rem' } }), _jsx("h1", { style: { fontSize: '1.5rem', color: '#00796b' }, children: "BengaPrivacy" })] }), _jsx("h2", { style: { color: '#00796b', marginBottom: '1.5rem' }, children: "Match Result" }), error && _jsx("p", { style: { color: '#d32f2f' }, children: error }), result && (_jsxs("div", { style: {
                    backgroundColor: '#ffffff',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    minWidth: '320px'
                }, children: [_jsxs("p", { children: [_jsx("strong", { children: "Matched Provider:" }), " ", result.match] }), _jsxs("p", { children: [_jsx("strong", { children: "Score:" }), " ", result.score] }), _jsxs("p", { children: [_jsx("strong", { children: "Broker:" }), " ", result.broker] })] })), _jsx("button", { onClick: () => navigate('/request'), style: {
                    marginTop: '1.5rem',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    backgroundColor: '#00796b',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                }, children: "Back to Request" })] }));
}
