import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';

// GET /api/reviews?neighborhoodId=1 or ?area=Greenwood
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
    // Support query by area (name) or neighborhoodId
    let neighborhoodId = searchParams.get('neighborhoodId');
    let area = searchParams.get('area');
    let id: number | undefined;

    if (neighborhoodId) {
      id = Number(neighborhoodId);
    } else if (area) {
      const neighborhood = await prisma.neighborhood.findFirst({ where: { name: area } });
      if (!neighborhood) {
        return NextResponse.json({ error: 'Neighborhood not found' }, { status: 404 });
      }
      id = neighborhood.id;
    } else {
      return NextResponse.json({ error: 'Must provide neighborhoodId or area' }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { neighborhoodId: id },
      include: {
        user: { select: { name: true, email: true } },
        neighborhood: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

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
    const body = await request.json();
    const { neighborhoodId, area, content, categoryRatings, userId, authorId } = body;

    // Accept userId or authorId for compatibility
    const finalUserId = userId || authorId;
    if ((!neighborhoodId && !area) || !content || !categoryRatings || typeof categoryRatings !== 'object' || !finalUserId) {
      return NextResponse.json({ error: 'neighborhoodId or area, content, categoryRatings, and userId are required' }, { status: 400 });
    }

    // Find or create neighborhood by id or area name
    let nId = neighborhoodId;
    if (!nId && area) {
      let neighborhood = await prisma.neighborhood.findFirst({ where: { name: area } });
      if (!neighborhood) {
        // Create new minimal neighborhood if not found
        neighborhood = await prisma.neighborhood.create({
          data: {
            name: area,
            city: '',
            state: '',
            zipCode: '',
            population: 0,
            medianIncome: 0,
            crimeRate: 0,
            walkScore: 0,
            transitScore: 0,
            bikeScore: 0,
            amenities: '',
          },
        });
      }
      nId = neighborhood.id;
    }

    // Check user exists
    const user = await prisma.user.findUnique({ where: { id: finalUserId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        content,
        categoryRatings: typeof categoryRatings === 'string' ? categoryRatings : JSON.stringify(categoryRatings),
        userId: finalUserId,
        neighborhoodId: nId,
      },
      include: {
        user: { select: { name: true, email: true } },
        neighborhood: { select: { name: true } },
      },
    });

    // Parse categoryRatings before returning to frontend
    const reviewWithParsedRatings = {
      ...review,
      categoryRatings: typeof review.categoryRatings === 'string' ? JSON.parse(review.categoryRatings) : review.categoryRatings
    };

    return NextResponse.json(reviewWithParsedRatings, { status: 201 });
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json({ error: 'Error submitting review' }, { status: 500 });
  }
}