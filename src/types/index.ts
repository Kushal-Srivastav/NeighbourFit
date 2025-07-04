import { PrismaClient } from '@prisma/client';

// Define types using Prisma schema
export type UserPreference = {
  userId: string;
  budget: number;
  commuteTime: number;
  amenities: string;
  safetyWeight: number;
  commuteWeight: number;
  amenitiesWeight: number;
  walkabilityWeight: number;
};

export type Neighborhood = {
  name: string;
  city: string;
  state: string;
  zipCode: string;
  population: number;
  medianIncome: number;
  crimeRate: number;
  walkScore: number;
  transitScore: number;
  bikeScore: number;
  amenities: string;
};

export type Match = {
  userId: string;
  neighborhoodId: number;
  score: number;
};

export type Review = {
  id: number;
  content: string;
  rating: number;
  category: string;
  userId: string;
  neighborhoodId: number;
  createdAt: Date;
};

// Define interfaces for Prisma models
export interface PrismaUserPreference extends UserPreference {
  id: string;
}

export interface PrismaNeighborhood extends Neighborhood {
  id: number;
}

export interface PrismaMatch extends Match {
  id: string;
}

export interface PrismaReview extends Review {
  id: number;
  category: string;
}
