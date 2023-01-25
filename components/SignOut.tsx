'use client';

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const SignOut = () => {
  const router = useRouter();

  const handleClickk = () => {
    signOut();
    router.push('/');
  }

  return (
    <button onClick={handleClickk}>
      Sign Out
    </button>
  );
}
