import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample neighborhoods
  const neighborhoodsData = [
    {
      name: 'Greenwood',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98103',
      population: 25000,
      medianIncome: 85000,
      crimeRate: 2.1,
      walkScore: 88,
      transitScore: 70,
      bikeScore: 80,
      amenities: 'parks,schools,restaurants',
    },
    {
      name: 'Mission District',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94110',
      population: 75000,
      medianIncome: 95000,
      crimeRate: 3.5,
      walkScore: 95,
      transitScore: 90,
      bikeScore: 85,
      amenities: 'cafes,public_transport,nightlife',
    },
    {
      name: 'Hyde Park',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60615',
      population: 29000,
      medianIncome: 67000,
      crimeRate: 2.9,
      walkScore: 82,
      transitScore: 78,
      bikeScore: 76,
      amenities: 'universities,museums,parks',
    },
  ];

  // Create neighborhoods
  await prisma.neighborhood.createMany({
    data: neighborhoodsData,
  });
  // Fetch all neighborhoods from DB to get their IDs
  const createdNeighborhoods = await prisma.neighborhood.findMany();

  // Create a demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@neighborfit.com' },
    update: {},
    create: {
      email: 'demo@neighborfit.com',
      name: 'Demo User',
    },
  });

  // Map reviews to correct neighborhood IDs
  const reviewsData = [
    {
      content: 'Great community and lots of parks nearby!',
      rating: 5,
      category: 'amenities',
      userId: user.id,
      neighborhoodId: createdNeighborhoods.find(n => n.name === 'Greenwood')?.id,
    },
    {
      content: 'Quiet, safe, but a bit far from downtown.',
      rating: 4,
      category: 'safety',
      userId: user.id,
      neighborhoodId: createdNeighborhoods.find(n => n.name === 'Greenwood')?.id,
    },
    {
      content: 'Amazing schools and friendly neighbors.',
      rating: 5,
      category: 'schools',
      userId: user.id,
      neighborhoodId: createdNeighborhoods.find(n => n.name === 'Hyde Park')?.id,
    },
    {
      content: 'Affordable and close to public transport.',
      rating: 4,
      category: 'commute',
      userId: user.id,
      neighborhoodId: createdNeighborhoods.find(n => n.name === 'Mission District')?.id,
    },
  ];

  // Only include reviews with a valid neighborhoodId (number)
  const validReviews = reviewsData.filter(r => typeof r.neighborhoodId === 'number') as {
    content: string;
    rating: number;
    category: string;
    userId: string;
    neighborhoodId: number;
  }[];
  if (validReviews.length > 0) {
    await prisma.review.createMany({
      data: validReviews,
    });
  }

  // Seed a user preference that will always match
  await prisma.userPreference.upsert({
    where: { userId: user.id },
    update: {
      budget: 1000000,
      commuteTime: 60,
      amenities: 'parks,schools,restaurants,cafes,public_transport,nightlife,universities,museums',
      safetyWeight: 1,
      commuteWeight: 1,
      amenitiesWeight: 1,
      walkabilityWeight: 1,
    },
    create: {
      userId: user.id,
      budget: 1000000,
      commuteTime: 60,
      amenities: 'parks,schools,restaurants,cafes,public_transport,nightlife,universities,museums',
      safetyWeight: 1,
      commuteWeight: 1,
      amenitiesWeight: 1,
      walkabilityWeight: 1,
    },
  });

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
