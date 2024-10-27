import db from '@lib/db.js';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    await db.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );

    return NextResponse.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    if ((error as { code?: string }).code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 409 });
    }
    console.error('Error in /api/signup:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
