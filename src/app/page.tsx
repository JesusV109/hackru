"use client";

import { useState } from 'react';

const SubmitScorePage = () => {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, score: parseInt(score, 10) }),
      });
      const result = await response.json();
      if (result.success) {
        setMessage(result.message);
        setName('');
        setScore('');
      } else {
        setMessage('Error submitting score');
      }
    } catch {
      setMessage('Server error');
    }
  };

  return (
    <div>
      <h1>Submit Your Score</h1>
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
          onChange={(e) => setScore(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SubmitScorePage;