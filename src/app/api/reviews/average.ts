import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/reviews/average?area=AreaName
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const area = searchParams.get('area');
  if (!area) {
    return NextResponse.json({ error: 'Area parameter is required' }, { status: 400 });
  }
  // Find neighborhood by area name
  const neighborhood = await prisma.neighborhood.findFirst({ where: { name: area } });
  if (!neighborhood) {
    return NextResponse.json({ error: 'Neighborhood not found' }, { status: 404 });
  }
  // Calculate average ratings by category for the neighborhood
  const reviews = await prisma.review.findMany({
    where: { neighborhoodId: neighborhood.id },
  });
  if (!reviews.length) {
    return NextResponse.json({});
  }
  // Aggregate averages by category
  const categorySums: Record<string, { sum: number; count: number }> = {};
  for (const review of reviews) {
    if (!categorySums[review.category]) {
      categorySums[review.category] = { sum: 0, count: 0 };
    }
    categorySums[review.category].sum += review.rating;
    categorySums[review.category].count += 1;
  }
  const averages: Record<string, number> = {};
  for (const [cat, { sum, count }] of Object.entries(categorySums)) {
    averages[cat] = sum / count;
  }
  return NextResponse.json(averages);
}
