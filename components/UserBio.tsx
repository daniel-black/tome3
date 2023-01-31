'use client';

import { useState } from "react";

export const UserBio = () => {
  const [bio, setBio] = useState<string | null>(null);

  const hitApi = async () => {
    const res = await fetch('/api/bio', {
      method: 'GET'
    });
    const data = await res.json();
    console.log(data);
    setBio(data.bio);
  }

  return (
    <div>
      {bio ? (
        <div>
          {bio}
        </div>
      ) : (
        <div>No bio</div>
      )}
      <button className="p-1 border" onClick={hitApi}>
        Read bio
      </button>
    </div>
  );
}