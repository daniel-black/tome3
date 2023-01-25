'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const router = useRouter();

  const handleClick = async () => {
    await signIn();
    router.push('/protected');
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-300 text-blue-900 rounded px-5 py-2 text-xl"
      >
        Log in
      </button>
    </div>
  );
}

export default LoginPage;