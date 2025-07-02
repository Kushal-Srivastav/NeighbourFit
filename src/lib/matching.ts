import { type Neighborhood, type UserPreference } from '@prisma/client';

interface WeightedScore {
  safety: number;
  commute: number;
  amenities: number;
  walkability: number;
}



export class MatchingAlgorithm {
  private static readonly MAX_SCORE = 100;

  static calculateMatchScore(
    neighborhood: Neighborhood,
    preferences: UserPreference
  ): number {
    const weightedScores = this.calculateWeightedScores(neighborhood, preferences);
    
    // Normalize each score to 0-100 range
    const normalizedScores = {
      safety: this.normalizeScore(weightedScores.safety, 0, 100),
      commute: this.normalizeScore(weightedScores.commute, 0, 100),
      amenities: this.normalizeScore(weightedScores.amenities, 0, 100),
      walkability: this.normalizeScore(weightedScores.walkability, 0, 100),
    };

    // Calculate final score based on user's weight preferences
    const finalScore = (
      (normalizedScores.safety * preferences.safetyWeight) +
      (normalizedScores.commute * preferences.commuteWeight) +
      (normalizedScores.amenities * preferences.amenitiesWeight) +
      (normalizedScores.walkability * preferences.walkabilityWeight)
    ) / (preferences.safetyWeight + preferences.commuteWeight + preferences.amenitiesWeight + preferences.walkabilityWeight);

    return Math.round(finalScore);
  }

  private static calculateWeightedScores(
    neighborhood: Neighborhood,
    preferences: UserPreference
  ): WeightedScore {
    const userAmenities = JSON.parse(preferences.amenities) as string[];
    const neighborhoodAmenities = JSON.parse(neighborhood.amenities) as string[];
    
    return {
      safety: this.calculateSafetyScore(neighborhood.crimeRate),
      commute: this.calculateCommuteScore(neighborhood.transitScore, neighborhood.walkScore),
      amenities: this.calculateAmenitiesScore(userAmenities, neighborhoodAmenities),
      walkability: this.calculateWalkabilityScore(neighborhood.walkScore),
    };
  }

  private static calculateSafetyScore(crimeRate: number): number {
    // Lower crime rate is better, scale it to 0-100
    return 100 - (crimeRate * 10);
  }

  private static calculateCommuteScore(transitScore: number, walkScore: number): number {
    // Average of transit and walk scores
    return (transitScore + walkScore) / 2;
  }

  private static calculateAmenitiesScore(userAmenities: string[], neighborhoodAmenities: string[]): number {
    const matchingAmenities = userAmenities.filter(amenity => 
      neighborhoodAmenities.includes(amenity)
    );
    
    return (matchingAmenities.length / userAmenities.length) * 100;
  }

  private static calculateWalkabilityScore(walkScore: number): number {
    return walkScore;
  }

  private static normalizeScore(score: number, min: number, max: number): number {
    return ((score - min) / (max - min)) * 100;
  }
}
