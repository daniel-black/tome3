'use client';

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchText);
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full flex justify-center">
        <input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder='The Old Man and the Sea'
          type="text"
          className={`max-w-md w-full rounded bg-gray-300 text-gray-900 py-1 px-3 text-lg outline-none`}
          spellCheck={false}
        />
      </form>
    </div>
  );
}