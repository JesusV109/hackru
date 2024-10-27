// C:\Users\alber\HackRU\hackathon\test-db-connection.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Connected to the database successfully!');
    await connection.end();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

testConnection();
