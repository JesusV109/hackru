// src/app/find-route/page.tsx

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FindRoutePage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to the main page with origin and destination as query parameters
    router.push(`/?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
  };

  return (
    <div>
      <h1>Public Transport Route Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <button type="submit">Find Route</button>
      </form>
    </div>
  );
}
