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

  // List all required fields
  const requiredFields = [
    'budget',
    'commuteTime',
    'amenities',
    'safetyWeight',
    'commuteWeight',
    'amenitiesWeight',
    'walkabilityWeight'
  ];
  // Check for missing fields
  const missing = requiredFields.filter(f => data[f] === undefined || data[f] === null);
  if (missing.length > 0) {
    return NextResponse.json({ error: `Missing required fields: ${missing.join(', ')}` }, { status: 400 });
  }

  // Ensure user exists in the database
  let user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    // Optionally, get more info from Clerk here
    user = await prisma.user.create({ data: { id: userId, email: '', name: '' } });
  }

  const upserted = await prisma.userPreference.upsert({
    where: { userId },
    update: data,
    create: {
      userId,
      budget: data.budget,
      commuteTime: data.commuteTime,
      amenities: data.amenities,
      safetyWeight: data.safetyWeight,
      commuteWeight: data.commuteWeight,
      amenitiesWeight: data.amenitiesWeight,
      walkabilityWeight: data.walkabilityWeight,
    },
  });
  return NextResponse.json(upserted);
}

