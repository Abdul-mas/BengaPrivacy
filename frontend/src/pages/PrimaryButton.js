import { jsx as _jsx } from "react/jsx-runtime";
export default function PrimaryButton({ children, onClick }) {
    return (_jsx("button", { onClick: onClick, style: {
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            backgroundColor: '#00796b',
            color: '#fff',
            border: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }, children: children }));
}
