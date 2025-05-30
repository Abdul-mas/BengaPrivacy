import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export default function SubmittedRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        fetch('http://localhost:3000/api/requester/submitted')
            .then(res => res.json())
            .then(data => Array.isArray(data) ? setRequests(data) : setError('Unexpected response.'))
            .catch(() => setError('Could not fetch submitted requests.'));
    }, []);
    return (_jsxs("div", { style: {
            padding: '2rem', fontFamily: 'Arial', backgroundColor: '#fafafa', minHeight: '100vh'
        }, children: [_jsx("h2", { style: { color: '#37474f' }, children: "\uD83D\uDCC4 Submitted Service Requests" }), error && _jsx("p", { style: { color: 'red' }, children: error }), requests.length === 0 ? (_jsx("p", { children: "No requests have been submitted yet." })) : (_jsx("ul", { style: { listStyle: 'none', padding: 0 }, children: requests.map((r, idx) => (_jsxs("li", { style: {
                        backgroundColor: '#fff', borderRadius: '8px',
                        padding: '1rem', marginBottom: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }, children: [_jsx("strong", { children: "Requester:" }), " ", r.id, " ", _jsx("br", {}), _jsx("strong", { children: "Privacy:" }), " ", r.privacy, " ", _jsx("br", {}), _jsx("strong", { children: "Request:" }), " ", r.req] }, idx))) }))] }));
}
