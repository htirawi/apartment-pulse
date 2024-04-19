import Link from 'next/link';

function HomePage() {
  return (
    <div>
      <h1 className="text-3xl">Welcome to the homepage!</h1>
      <Link href="/apartments">View apartments</Link>
    </div>
  );
}

export default HomePage;
