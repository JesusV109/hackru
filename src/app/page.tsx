// src/app/page.tsx

"use client";

import { useEffect, useState } from 'react';

interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
}

const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [name, setName] = useState('');
  const [score, setScore] = useState<number | ''>('');

  useEffect(() => {
    // Fetch leaderboard data
    const fetchLeaderboard = async () => {
      const response = await fetch('/api/leaderboard');
      const data = await response.json();
      setEntries(data);
    };

    fetchLeaderboard();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name && typeof score === 'number') {
      // Send data to API
      const response = await fetch('/api/submit-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, score }),
      });

      if (response.ok) {
        const newEntry = await response.json();
        setEntries((prevEntries) => [...prevEntries, newEntry.data]);
        setName(''); // Clear the input fields
        setScore('');
      } else {
        console.error('Failed to submit score');
      }
    }
  };

  return (
    <div>
      <h1>Leaderboard</h1>

      {/* Form to Submit Score */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value ? parseInt(e.target.value) : '')}
          required
        />
        <button type="submit">Submit Score</button>
      </form>

      {/* Display Leaderboard */}
      <ul>
        {entries
          .sort((a, b) => b.score - a.score)
          .map((entry) => (
            <li key={entry.id}>
              {entry.name}: {entry.score}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
