import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/neighborhoods - fetch all neighborhoods with basic info and review count
export async function GET() {
  try {
    const neighborhoods = await prisma.neighborhood.findMany({
      include: {
        reviews: true,
      },
      orderBy: { name: 'asc' },
    });

    // Format response with review count
    const formatted = neighborhoods.map(n => ({
      id: n.id,
      name: n.name,
      city: n.city,
      state: n.state,
      zipCode: n.zipCode,
      population: n.population,
      medianIncome: n.medianIncome,
      crimeRate: n.crimeRate,
      walkScore: n.walkScore,
      transitScore: n.transitScore,
      bikeScore: n.bikeScore,
      amenities: n.amenities.split(','),
      reviewCount: n.reviews.length,
      createdAt: n.createdAt,
      updatedAt: n.updatedAt,
    }));

    return NextResponse.json({ neighborhoods: formatted });
  } catch (error) {
    console.error('[GET /api/neighborhoods]', error);
    return NextResponse.json({ error: 'Failed to fetch neighborhoods' }, { status: 500 });
  }
}
