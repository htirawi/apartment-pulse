import Link from 'next/link';

function ApartmentsPage() {
  return (
    <div>
      <h1 className="text-3xl">Welcome to the apartments!</h1>
      <Link href="/">Back to Home</Link>
    </div>
  );
}

export default ApartmentsPage;
