// src/components/AppLayout.tsx
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#fafafa',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{ padding: '1rem', background: '#00796b', color: '#fff' }}>
        <h2 style={{ margin: 0 }}>Benga Privacy Platform</h2>
      </header>
      <main style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>
      <footer style={{ padding: '1rem', textAlign: 'center', color: '#888' }}>
        © {new Date().getFullYear()} ASAS Inc.
      </footer>
    </div>
  );
}
