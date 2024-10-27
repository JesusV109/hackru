// C:\Users\alber\HackRU\hackathon\src\app\api\lib\db.js

import mysql from 'mysql2/promise';

// Log to verify environment variables
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.getConnection()
  .then(() => console.log('Database connected successfully!'))
  .catch((error) => console.error('Database connection failed:', error));

export default db;

