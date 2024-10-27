// src/app/leaderboard/page.tsx

"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
}

const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [name, setName] = useState('');
  const [score, setScore] = useState<number | ''>('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Fetch leaderboard data from the backend API
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/get-leaderboard'); // Fetching data from the correct endpoint

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to fetch leaderboard:', errorText);
          return;
        }

        const data = await response.json();
        // Sort entries by score in descending order
        setEntries(data.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score));
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  // Handle submission of new scores
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name && typeof score === 'number') {
      try {
        const response = await fetch('/api/submit-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, score }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to submit score:', errorText);
          return;
        }

        const newEntry = await response.json();
        const updatedEntries = [...entries, newEntry.data].sort((a, b) => b.score - a.score);
        setEntries(updatedEntries);
        setName('');
        setScore('');
        setHasSubmitted(true);

        // Save updated leaderboard to local storage for persistence
        localStorage.setItem('leaderboardEntries', JSON.stringify(updatedEntries));
      } catch (error) {
        console.error('Error in handleSubmit:', error);
      }
    }
  };

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>

      {/* Score submission form */}
      {!hasSubmitted ? (
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
      ) : (
        <p>Thank you for your submission!</p>
      )}

      {/* Link to return to the home page */}
      <Link href="/">
        <button style={{ marginTop: '20px', padding: '10px', backgroundColor: 'blue', color: 'white', borderRadius: '5px' }}>
          Go to Home Page
        </button>
      </Link>

      {/* Display leaderboard entries */}
      <ul className="leaderboard-list">
        {entries.map((entry, index) => (
          <li key={entry.id} className="leaderboard-entry">
            #{index + 1}: {entry.name} - {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
