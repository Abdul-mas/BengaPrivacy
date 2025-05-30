import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ASAS Inc..webp';
export default function SelectionPage() {
    const navigate = useNavigate();
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
        }, children: [_jsx("h2", { style: { fontSize: '2.5rem', color: '#33691e', marginBottom: '1rem' }, children: "Register As" }), _jsxs("header", { style: { display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }, children: [_jsx("img", { src: logo, alt: "ASAS Logo", style: { width: '80px', marginRight: '1rem' } }), _jsx("h1", { style: { fontSize: '1.5rem', color: '#00796b' }, children: "BengaPrivacy" })] }), _jsxs("div", { style: { display: 'flex', gap: '2rem' }, children: [_jsx("button", { onClick: () => navigate('/register/requester'), style: {
                            padding: '1rem 2rem',
                            fontSize: '1.1rem',
                            color: '#ffffff',
                            backgroundColor: '#689f38',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        }, children: "Requester" }), _jsx("button", { onClick: () => navigate('/register/provider'), style: {
                            padding: '1rem 2rem',
                            fontSize: '1.1rem',
                            color: '#33691e',
                            backgroundColor: '#f1f8e9',
                            border: '2px solid #689f38',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)'
                        }, children: "Provider" })] })] }));
}
