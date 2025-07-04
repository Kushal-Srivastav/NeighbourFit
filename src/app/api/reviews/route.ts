import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const area = searchParams.get('area');

  if (!prisma) {
    return NextResponse.json({ error: 'Prisma client not initialized' }, { status: 500 });
  }

  if (!area) {
    return NextResponse.json({ error: 'Area parameter is required' }, { status: 400 });
  }

  try {
    const neighborhood = await prisma.$queryRaw`
      SELECT id FROM Neighborhood WHERE name = ${area}
    ` as { id: number } | null;

    if (!neighborhood) {
      return NextResponse.json({ error: 'Neighborhood not found' }, { status: 404 });
    }

    const reviews = await prisma.$queryRaw`
      SELECT r.*, u.name as authorName, n.name as neighborhoodName
      FROM Review r
      JOIN User u ON r.userId = u.id
      JOIN Neighborhood n ON r.neighborhoodId = n.id
      WHERE n.name = ${area}
    ` as { id: number; content: string; rating: number; userId: string; neighborhoodId: number; authorName: string; neighborhoodName: string }[];

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Error fetching reviews' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!prisma) {
    return NextResponse.json({ error: 'Prisma client not initialized' }, { status: 500 });
  }

  try {
    const { area, content, authorId, category, rating } = await request.json();

    if (!area || !content || !category || typeof rating !== 'number') {
      return NextResponse.json({ error: 'Area, content, category, and rating are required' }, { status: 400 });
    }

    const neighborhood = await prisma.$queryRaw`
      SELECT id FROM Neighborhood WHERE name = ${area}
    ` as { id: number } | null;

    if (!neighborhood) {
      return NextResponse.json({ error: 'Neighborhood not found' }, { status: 404 });
    }

    const newReview = await prisma.$executeRaw`
      INSERT INTO Review (content, userId, neighborhoodId, rating, category)
      VALUES (${content}, ${authorId}, ${neighborhood.id}, ${rating}, ${category})
    `;

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json({ error: 'Error submitting review' }, { status: 500 });
  }
}