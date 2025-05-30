import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/ASAS Inc..webp';
const serviceNames = ['Diagnosis', 'Treatment', 'Medication'];
const resultFormats = ['Text', 'PDF'];
export default function ProviderServicePage() {
    const { providerId } = useParams();
    const [service, setService] = useState(serviceNames[0]);
    const [cost, setCost] = useState('');
    const [format, setFormat] = useState(resultFormats[0]);
    const [message, setMessage] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            providerId,
            name: service,
            cost: parseFloat(cost),
            resultFormat: format,
        };
        try {
            const res = await fetch('http://localhost:3000/api/provider/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const json = await res.json();
            setMessage(json.error ? `❌ ${json.error}` : '✅ Service added successfully');
        }
        catch (err) {
            console.error('Error adding service:', err);
            setMessage('❌ Failed to add service');
        }
    };
    return (_jsxs("div", { style: { maxWidth: '600px', margin: '2rem auto', padding: '1rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }, children: [_jsxs("h2", { children: ["Add Service for Provider: ", providerId] }), _jsxs("header", { style: { display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }, children: [_jsx("img", { src: logo, alt: "ASAS Logo", style: { width: '80px', marginRight: '1rem' } }), _jsx("h1", { style: { fontSize: '1.5rem', color: '#00796b' }, children: "BengaPrivacy" })] }), _jsxs("form", { onSubmit: handleSubmit, style: { display: 'flex', flexDirection: 'column', gap: '1rem' }, children: [_jsxs("label", { children: ["Service Name:", _jsx("select", { value: service, onChange: (e) => setService(e.target.value), children: serviceNames.map((s) => (_jsx("option", { value: s, children: s }, s))) })] }), _jsxs("label", { children: ["Cost:", _jsx("input", { type: "number", value: cost, onChange: (e) => setCost(e.target.value), required: true })] }), _jsxs("label", { children: ["Result Format:", _jsx("select", { value: format, onChange: (e) => setFormat(e.target.value), children: resultFormats.map((f) => (_jsx("option", { value: f, children: f }, f))) })] }), _jsx("button", { type: "submit", children: "Add Service" })] }), message && _jsx("div", { style: { marginTop: '1rem' }, children: message })] }));
}
