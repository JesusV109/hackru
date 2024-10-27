// src/app/api/get-leaderboard/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const users = await prisma.user.findMany({
        orderBy: { score: 'desc' },
      });
      return res.status(200).json({ success: true, data: users });
    } else {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in /api/get-leaderboard:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
