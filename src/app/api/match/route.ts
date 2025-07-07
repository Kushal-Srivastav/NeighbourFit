import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';

// Match endpoint: returns best neighborhoods for current user
export async function POST(request: Request) {
  const { userId } = getAuth(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const prefs = await prisma.userPreference.findUnique({ where: { userId } });
  if (!prefs) return NextResponse.json({ error: 'No preferences found' }, { status: 404 });
  const neighborhoods = await prisma.neighborhood.findMany();
  // Simple scoring based on weights
  const matches = neighborhoods.map(n => {
    let score = 0;
    score += ((n.walkScore || 0) / 100) * (prefs.walkabilityWeight * 100);
    score += ((n.transitScore || 0) / 10) * (prefs.commuteWeight * 100);
    score += ((n.crimeRate !== undefined ? (10 - n.crimeRate) : 0) / 10) * (prefs.safetyWeight * 100);
    // Amenities match (not implemented in detail)
    score += (prefs.amenities && n.amenities && n.amenities.split(',').some(a => prefs.amenities.includes(a))) ? (prefs.amenitiesWeight * 100) : 0;
    return { ...n, score };
  });
  matches.sort((a, b) => b.score - a.score);
  return NextResponse.json(matches.slice(0, 10));
}
