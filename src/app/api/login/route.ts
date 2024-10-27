import db from '@lib/db.js';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

// Define the structure of the user data
interface User {
  id: number;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }

    // Destructure the result to separate rows from fields and assert rows as User[]
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]) as [User[], unknown[]];

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
    }

    const user = rows[0];

    // Compare provided password with stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
    }

    return NextResponse.json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Error in /api/login:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
