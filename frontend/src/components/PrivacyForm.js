import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const privacyOptions = {
    requester: ['reveal_both', 'hide_id', 'hide_req', 'hide_both'],
    provider: ['reveal_both', 'hide_id', 'hide_ser', 'hide_both'],
};
export default function PrivacyForm() {
    const [role, setRole] = useState('requester');
    const [mode, setMode] = useState('register');
    const [id, setId] = useState('');
    const [privacy, setPrivacy] = useState('reveal_both');
    const [reqText, setReqText] = useState(''); // <- request content
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (role === 'provider') {
                const providerPayload = { id, privacy };
                const res = await fetch('http://localhost:3000/api/provider', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(providerPayload),
                });
                const json = await res.json();
                setResponse(json);
                if (!json.error)
                    navigate(`/provider/${id}/services`);
                return;
            }
            if (mode === 'register') {
                const registerPayload = { id, privacy };
                const res = await fetch('http://localhost:3000/api/requester', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(registerPayload),
                });
                const json = await res.json();
                setResponse(json);
                if (!json.error)
                    navigate(`/requester/${id}/request`);
            }
            if (mode === 'request') {
                const matchPayload = { id, req: reqText, privacy };
                const res = await fetch('http://localhost:3000/api/matching', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(matchPayload),
                });
                const json = await res.json();
                setResponse(json);
            }
        }
        catch (err) {
            console.error('Error:', err);
            setResponse({ error: 'Operation failed.' });
        }
    };
    return (_jsx("div", { style: {
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            height: '100vh', backgroundColor: '#f4f4f4'
        }, children: _jsxs("div", { className: "form-container", style: {
                background: '#fff', padding: '2rem', borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }, children: [_jsx("h2", { style: { textAlign: 'center' }, children: role === 'provider' ? 'Provider Registration' :
                        mode === 'register' ? 'Requester Registration' : 'Request Service' }), _jsxs("form", { onSubmit: handleSubmit, style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsxs("label", { children: ["Role:", _jsxs("select", { value: role, onChange: e => {
                                        setRole(e.target.value);
                                        setMode('register');
                                    }, children: [_jsx("option", { value: "requester", children: "Requester" }), _jsx("option", { value: "provider", children: "Provider" })] })] }), role === 'requester' && (_jsxs("label", { children: ["Mode:", _jsxs("select", { value: mode, onChange: e => setMode(e.target.value), children: [_jsx("option", { value: "register", children: "Register" }), _jsx("option", { value: "request", children: "Request Service" })] })] })), _jsxs("label", { children: ["ID:", _jsx("input", { type: "text", value: id, onChange: e => setId(e.target.value) })] }), _jsxs("label", { children: ["Privacy Degree:", _jsx("select", { value: privacy, onChange: e => setPrivacy(e.target.value), children: privacyOptions[role].map(p => (_jsx("option", { value: p, children: p }, p))) })] }), role === 'requester' && mode === 'request' && (_jsxs("label", { children: ["Service Request:", _jsx("input", { type: "text", value: reqText, onChange: e => setReqText(e.target.value) })] })), _jsx("button", { type: "submit", children: mode === 'request' ? 'Match Provider' : 'Submit' })] }), response && (_jsx("div", { className: "response-box", style: { marginTop: '1rem' }, children: response.error ? (_jsxs("div", { style: { color: 'red' }, children: ["\u274C ", response.error] })) : (_jsxs(_Fragment, { children: ["\u2705 ", _jsx("strong", { children: "Matched Provider:" }), " ", response.match, _jsx("br", {}), "\uD83D\uDD22 ", _jsx("strong", { children: "Score:" }), " ", response.score, _jsx("br", {}), "\uD83E\uDD1D ", _jsx("strong", { children: "Broker:" }), " ", response.broker] })) }))] }) }));
}
