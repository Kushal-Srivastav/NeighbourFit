import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/neighborhoods/ratings
// Returns: [{ neighborhoodId, name, ratings: { safety, nightlife, parks, cleanliness, connectivity, network_coverage } }]
export async function GET(request: Request) {
  try {
    // Get all neighborhoods
    const neighborhoods = await prisma.neighborhood.findMany();
    // For each neighborhood, aggregate average ratings per category
    const results = await Promise.all(
      neighborhoods.map(async (n) => {
        // Get average ratings by category for this neighborhood
        const ratings = await prisma.review.groupBy({
          by: ['category'],
          where: { neighborhoodId: n.id },
          _avg: { rating: true }
        });
        // Convert to { category: avg }
        const ratingsObj: Record<string, number> = {};
        ratings.forEach(r => {
          ratingsObj[r.category] = r._avg.rating ?? 0;
        });
        return {
          neighborhoodId: n.id,
          name: n.name,
          ratings: ratingsObj
        };
      })
    );
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error aggregating neighborhood ratings:', error);
    return NextResponse.json({ error: 'Failed to aggregate ratings' }, { status: 500 });
  }
}
