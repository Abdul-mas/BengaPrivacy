import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/AppLayout.tsx
export default function AppLayout({ children }) {
    return (_jsxs("div", { style: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: '#fafafa',
            fontFamily: 'Arial, sans-serif'
        }, children: [_jsx("header", { style: { padding: '1rem', background: '#00796b', color: '#fff' }, children: _jsx("h2", { style: { margin: 0 }, children: "Benga Privacy Platform" }) }), _jsx("main", { style: { flex: 1, padding: '2rem' }, children: children }), _jsxs("footer", { style: { padding: '1rem', textAlign: 'center', color: '#888' }, children: ["\u00A9 ", new Date().getFullYear(), " ASAS Inc."] })] }));
}
