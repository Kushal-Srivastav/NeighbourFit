import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Test types
const testUserPreference: Prisma.UserPreferenceCreateInput = {
  userId: 'test-id',
  budget: 1000,
  commuteTime: 30,
  amenities: '[]',
  safetyWeight: 0.5,
  commuteWeight: 0.5,
  amenitiesWeight: 0.5,
  walkabilityWeight: 0.5
};

const testNeighborhood: Prisma.NeighborhoodCreateInput = {
  name: 'Test Neighborhood',
  city: 'Test City',
  state: 'Test State',
  zipCode: '12345',
  population: 1000,
  medianIncome: 50000,
  crimeRate: 0.5,
  walkScore: 75,
  transitScore: 75,
  bikeScore: 75,
  amenities: '[]'
};
