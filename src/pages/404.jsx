import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', fontFamily: 'system-ui, sans-serif', textAlign: 'center', padding: 24 }}>
      <div>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>404</h1>
        <p style={{ color: '#666', marginBottom: 16 }}>Page not found.</p>
        <Link href="/">Go home</Link>
      </div>
    </div>
  );
}
