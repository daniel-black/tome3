import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="py-16 text-center">
      <h1 className="font-bold text-4xl">Tome.</h1>
      <p className="font-semibold text-2xl">Your library, online</p>
      <div className="mt-8 space-x-5 text-blue-300">
        <Link
          href={'/'}
          className='underline hover:text-blue-400'
        >
          Login
        </Link>
        <span className="select-none">·</span>
        <Link
          href={'/'}
          className='underline hover:text-blue-400'
        >
          Register
        </Link>
      </div>
    </div>
  );
}
