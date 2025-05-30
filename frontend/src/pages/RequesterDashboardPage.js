import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import logo from '../assets/ASAS Inc..webp';
export default function RequesterDashboardPage() {
    const [request, setRequest] = useState('');
    const [message, setMessage] = useState('');
    const [result, setResult] = useState(null);
    const requesterId = localStorage.getItem('requesterId');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setResult(null);
        if (!request || !requesterId) {
            setMessage('❌ Request is required.');
            return;
        }
        try {
            const res = await fetch('http://localhost:3000/api/requester', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: requesterId, req: request }),
            });
            const data = await res.json();
            if (res.ok) {
                setResult(data);
            }
            else {
                setMessage(`❌ ${data.error || 'No match found'}`);
            }
        }
        catch (error) {
            console.error('Service request error:', error);
            setMessage('❌ Server error.');
        }
    };
    return (_jsxs("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0f4f8, #ffffff)',
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            padding: '2rem'
        }, children: [_jsxs("header", { style: { display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }, children: [_jsx("img", { src: logo, alt: "ASAS Logo", style: { width: '80px', marginRight: '1rem' } }), _jsx("h1", { style: { fontSize: '1.5rem', color: '#00796b' }, children: "BengaPrivacy" })] }), _jsx("h2", { style: { color: '#3f51b5', marginBottom: '1rem' }, children: "Service Request" }), _jsxs("form", { onSubmit: handleSubmit, style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    backgroundColor: '#ffffff',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    minWidth: '300px'
                }, children: [_jsx("input", { type: "text", placeholder: "Enter your request (e.g., Diagnosis)", value: request, onChange: (e) => setRequest(e.target.value), style: {
                            padding: '0.75rem',
                            fontSize: '1rem',
                            border: '1px solid #ccc',
                            borderRadius: '8px'
                        } }), _jsx("button", { type: "submit", style: {
                            padding: '0.75rem',
                            fontSize: '1rem',
                            backgroundColor: '#3f51b5',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }, children: "Submit Request" }), message && _jsx("div", { style: { color: '#d32f2f', marginTop: '1rem' }, children: message }), result && (_jsxs("div", { style: {
                            marginTop: '1.5rem',
                            padding: '1rem',
                            backgroundColor: '#e8f5e9',
                            border: '1px solid #c8e6c9',
                            borderRadius: '8px'
                        }, children: [_jsxs("p", { children: [_jsx("strong", { children: "Matched Provider:" }), " ", result.match] }), _jsxs("p", { children: [_jsx("strong", { children: "Score:" }), " ", result.score] }), _jsxs("p", { children: [_jsx("strong", { children: "Broker:" }), " ", result.broker] })] }))] })] }));
}
