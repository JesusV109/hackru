// src/app/api/submit-score/route.ts

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, score } = await request.json();

    if (!name || typeof score !== 'number') {
      return NextResponse.json(
        { success: false, message: 'Invalid input: name and score are required' },
        { status: 400 }
      );
    }

    const newEntry = await prisma.user.create({
      data: { name, score },
    });

    return NextResponse.json({ success: true, message: 'Score added!', data: newEntry }, { status: 200 });
  } catch (error) {
    console.error('Error in /api/submit-score:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
