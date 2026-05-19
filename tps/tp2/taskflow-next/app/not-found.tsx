import Image from 'next/image';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <Image
        src="/not-found.png"
        alt="Not found"
        width={300}
        height={300}
      />

      <h1>404</h1>
      <p>Page introuvable</p>
    </div>
  );
}