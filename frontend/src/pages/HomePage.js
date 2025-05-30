import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ASAS Inc..webp';
import logo2 from '../assets/BengaPrivacy Logo.png';
import { clearRequesterId, clearProviderId } from '../utils/session';
export default function HomePage() {
    const navigate = useNavigate();
    const buttonStyle = {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '260px',
        textAlign: 'center', // Valid here now
    };
    return (_jsxs("div", { style: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            width: '100vw',
            background: 'linear-gradient(135deg, #e0f7fa, #ffffff)',
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            padding: '2rem 1rem',
            boxSizing: 'border-box'
        }, children: [_jsxs("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                    padding: '1rem 2rem',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }, children: [_jsx("a", { href: "https://asasit.co", target: "_blank", rel: "noopener noreferrer", children: _jsx("img", { src: logo, alt: "ASAS Logo", style: { width: '60px', height: 'auto', marginRight: '1rem' } }) }), _jsx("span", { style: {
                            fontSize: '1.25rem',
                            fontWeight: 500,
                            color: '#004d40',
                            fontFamily: 'Arial, sans-serif'
                        }, children: "Applied Software & Automated Solutions" })] }), _jsx("img", { src: logo2, alt: "BengaPrivacy Logo", style: { width: '100px', marginBottom: '1rem' } }), _jsx("h1", { style: { fontSize: '3rem', color: '#00796b' }, children: "Benga" }), _jsx("p", { style: { fontSize: '1.25rem', color: '#004d40', margin: '1rem 0 2rem' }, children: "Privacy Protection Platform" }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '1rem' }, children: [_jsx("button", { onClick: () => navigate('/register'), style: { ...buttonStyle, backgroundColor: '#00796b', color: '#ffffff' }, children: "\uD83D\uDCDD Register" }), _jsx("button", { onClick: () => navigate('/request'), style: { ...buttonStyle, backgroundColor: '#e0f2f1', color: '#00796b', border: '2px solid #00796b' }, children: "\uD83D\uDCBC Request Service" }), _jsx("button", { onClick: () => navigate('/submitted-requests'), style: { ...buttonStyle, backgroundColor: '#fff3e0', color: '#e65100' }, children: "\uD83D\uDCC4 View Submitted Requests" }), _jsx("button", { onClick: () => navigate('/provider/requests'), style: { ...buttonStyle, backgroundColor: '#ede7f6', color: '#4527a0' }, children: "\uD83E\uDDD1\u200D\u2695\uFE0F Provider: Browse Requests" }), _jsx("button", { onClick: () => navigate('/requester-inbox'), style: { ...buttonStyle, backgroundColor: '#fce4ec', color: '#c2185b' }, children: "\uD83D\uDCE5 Requester Inbox" }), _jsx("button", { onClick: () => navigate('/provider-inbox'), style: { ...buttonStyle, backgroundColor: '#e1f5fe', color: '#0277bd' }, children: "\uD83D\uDCEC Provider Inbox" }), _jsx("button", { onClick: () => {
                            clearRequesterId();
                            clearProviderId();
                            navigate('/');
                        }, style: {
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            borderRadius: '8px',
                            backgroundColor: '#ffcdd2',
                            color: '#b71c1c',
                            border: 'none',
                            cursor: 'pointer',
                            marginTop: '1rem'
                        }, children: "\uD83D\uDEAA Logout" })] })] }));
}
