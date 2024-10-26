import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = 3000;

// MySQL connection pool
const pool = mysql.createPool({
  host: 'host',
  user: 'root',
  password: 'Mysql80@',
  database: 'leaderboard',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(express.json());

// Submit a new score
app.post('/score', async (req, res) => {
  const { userId, score } = req.body;
  try {
    const [results] = await pool.query(
      'INSERT INTO scores (user_id, score) VALUES (?, ?)',
      [userId, score]
    );
    res.status(201).json({ id: results.insertId, userId, score });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve the leaderboard
app.get('/leaderboard', async (req, res) => {
  try {
    const [results] = await pool.query(
      `SELECT u.username, s.score, s.created_at
       FROM scores s
       JOIN users u ON s.user_id = u.id
       ORDER BY s.score DESC, s.created_at ASC
       LIMIT 10`
    );
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});