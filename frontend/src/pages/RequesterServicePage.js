import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export default function RequesterServicePage() {
    const [requesters, setRequesters] = useState([]);
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
    const handleSubmit = async (e) => {
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
            }
            else {
                setStatus(`❌ ${data.error || 'Submission failed.'}`);
            }
        }
        catch (err) {
            console.error('Submission error:', err);
            setStatus('❌ Network or server error.');
        }
    };
    return (_jsxs("div", { style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '2rem', fontFamily: 'Arial', backgroundColor: '#fafafa', minHeight: '100vh'
        }, children: [_jsx("h2", { style: { fontSize: '1.8rem', color: '#37474f', marginBottom: '1.5rem' }, children: "\uD83D\uDCDD Submit a Service Request" }), _jsxs("form", { onSubmit: handleSubmit, style: { width: '100%', maxWidth: '500px' }, children: [_jsxs("div", { style: { marginBottom: '1rem' }, children: [_jsx("label", { style: { display: 'block', marginBottom: '0.5rem' }, children: "Select Requester:" }), _jsxs("select", { value: selectedRequesterId, onChange: (e) => setSelectedRequesterId(e.target.value), required: true, style: { width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }, children: [_jsx("option", { value: "", children: "-- Choose a requester --" }), requesters.map(r => (_jsxs("option", { value: r.id, children: [r.id, " (", r.privacy, ")"] }, r.id)))] })] }), _jsxs("div", { style: { marginBottom: '1rem' }, children: [_jsx("label", { style: { display: 'block', marginBottom: '0.5rem' }, children: "Service Request:" }), _jsx("textarea", { value: serviceRequest, onChange: (e) => setServiceRequest(e.target.value), rows: 3, required: true, placeholder: "Describe the requested service...", style: { width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' } })] }), _jsx("button", { type: "submit", disabled: !selectedRequesterId || !serviceRequest, style: {
                            backgroundColor: !selectedRequesterId || !serviceRequest ? '#ccc' : '#0288d1',
                            color: '#fff',
                            padding: '0.75rem 1.5rem',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: !selectedRequesterId || !serviceRequest ? 'not-allowed' : 'pointer'
                        }, children: "\uD83D\uDE80 Submit Request" })] }), status && (_jsx("p", { style: {
                    marginTop: '1rem',
                    color: status.startsWith('✅') ? 'green' : 'red',
                    fontWeight: 500
                }, children: status }))] }));
}
