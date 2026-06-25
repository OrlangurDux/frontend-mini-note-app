import Link from 'next/link';

export default function ServerErrorPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', fontFamily: 'system-ui, sans-serif', textAlign: 'center', padding: 24 }}>
      <div>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>500</h1>
        <p style={{ color: '#666', marginBottom: 16 }}>Something went wrong on our side.</p>
        <Link href="/">Go home</Link>
      </div>
    </div>
  );
}
