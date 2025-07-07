import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';

// Get current user's preferences
export async function GET(request: Request) {
  const { userId } = getAuth(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const prefs = await prisma.userPreference.findUnique({ where: { userId } });
  return NextResponse.json(prefs);
}

// Save/update current user's preferences
export async function POST(request: Request) {
  const { userId } = getAuth(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await request.json();
  const upserted = await prisma.userPreference.upsert({
    where: { userId },
    update: data,
    create: { ...data, userId },
  });
  return NextResponse.json(upserted);
}
