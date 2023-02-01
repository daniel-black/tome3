import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link
        href={'/dashboard'}
        className='bg-amber-900 text-amber-500 text-3xl px-8 py-4 rounded-lg ring ring-amber-700'
      >
        Login
      </Link>
    </div>
  );
}
