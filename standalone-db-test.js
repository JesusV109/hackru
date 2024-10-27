// standalone-db-test.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testConnection() {
  try {
    console.log('Connecting to the database with the following details:');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`User: ${process.env.DB_USER}`);
    console.log(`Database: ${process.env.DB_NAME}`);

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Database connected successfully!');
    await connection.end();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

testConnection();
