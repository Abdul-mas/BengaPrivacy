// src/components/PrimaryButton.tsx
import React from 'react';

export default function PrimaryButton({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: '#00796b',
        color: '#fff',
        border: 'none',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
    >
      {children}
    </button>
  );
}
