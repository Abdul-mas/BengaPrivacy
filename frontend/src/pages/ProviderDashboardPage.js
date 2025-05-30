import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ASAS Inc..webp';
export default function ProviderDashboardPage() {
    const [services, setServices] = useState([]);
    const [error, setError] = useState('');
    const providerId = localStorage.getItem('providerId');
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchServices() {
            try {
                const res = await fetch(`http://localhost:3000/api/provider/service/${providerId}`);
                const data = await res.json();
                if (res.ok) {
                    setServices(data);
                }
                else {
                    setError(data.error || 'Failed to fetch services');
                }
            }
            catch (err) {
                console.error('Error loading services:', err);
                setError('❌ Server error');
            }
        }
        if (providerId) {
            fetchServices();
        }
    }, [providerId]);
    return (_jsxs("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f5f5, #e0f7fa)',
            fontFamily: 'Arial, sans-serif',
            padding: '2rem',
            textAlign: 'center'
        }, children: [_jsxs("header", { style: { display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }, children: [_jsx("img", { src: logo, alt: "ASAS Logo", style: { width: '80px', marginRight: '1rem' } }), _jsx("h1", { style: { fontSize: '1.5rem', color: '#00796b' }, children: "BengaPrivacy" })] }), _jsx("h2", { style: { color: '#00695c', marginBottom: '1rem' }, children: "Provider Dashboard" }), _jsxs("p", { style: { marginBottom: '1rem' }, children: ["ID: ", _jsx("strong", { children: providerId })] }), _jsx("button", { onClick: () => navigate('/provider/service'), style: {
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    backgroundColor: '#00796b',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginBottom: '2rem'
                }, children: "Add New Service" }), error && _jsx("p", { style: { color: '#d32f2f' }, children: error }), services.length > 0 ? (_jsx("div", { style: { maxWidth: '500px', width: '100%' }, children: services.map((service, idx) => (_jsxs("div", { style: {
                        backgroundColor: '#ffffff',
                        marginBottom: '1rem',
                        padding: '1rem',
                        borderRadius: '10px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }, children: [_jsxs("p", { children: [_jsx("strong", { children: "Name:" }), " ", service.name] }), _jsxs("p", { children: [_jsx("strong", { children: "Cost:" }), " $", service.cost] }), _jsxs("p", { children: [_jsx("strong", { children: "Format:" }), " ", service.resultFormat] })] }, idx))) })) : (_jsx("p", { children: "No services registered yet." }))] }));
}
