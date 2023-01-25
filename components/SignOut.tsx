'use client';

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignOutIcon } from "./Icons";

export const SignOut = () => {
  const router = useRouter();

  const handleClick = () => {
    signOut();
    router.push('/');
  }

  return (
    <button
      className="text-base text-gray-400 hover:text-gray-300 hover:underline flex"
      onClick={handleClick}
    >
      <SignOutIcon /> Sign Out
    </button>
  );
}
