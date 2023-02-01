'use client';

import { AuthorSearchResponse, AuthorSearchSchema, OlAuthorSearchResponse } from '@/pages/api/ol/authors';
import { FormEvent, useState } from 'react';

export const AuthorsSearch = () => {
  const [q, setQ] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (q === '') return;

    console.log(q);
    const parsed = AuthorSearchSchema.parse({ q });
    const res = await fetch(`/api/ol/authors?q=${parsed.q}`);
    const data = await res.json() as AuthorSearchResponse;
    if (Object.hasOwn(data, 'error')) {
      console.error(data);
      return;
    }
    const authorSearchResponse = data as OlAuthorSearchResponse;
    console.log(authorSearchResponse)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </form>
    </div>
  );
}