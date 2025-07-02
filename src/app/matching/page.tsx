import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockPrisma as prisma } from '@/lib/mock-prisma';
import { MatchingAlgorithm } from '@/lib/matching';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { UserPreference, Neighborhood, Match, Review } from '@/types';

export default function MatchingPage() {
  const router = useRouter();
  const [preferences, setPreferences] = useState<UserPreference>({
    id: '',
    userId: '',
    budget: 0,
    commuteTime: 0,
    amenities: '[]',
    safetyWeight: 0.25,
    commuteWeight: 0.25,
    amenitiesWeight: 0.25,
    walkabilityWeight: 0.25,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [matches, setMatches] = useState<{ id: string; name: string; score: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      const neighborhoods = await prisma.neighborhood.findMany();
      setNeighborhoods(neighborhoods);
    };
    fetchNeighborhoods();
  }, []);

  const handleCalculateMatches = async () => {
    if (!preferences.userId) {
      // Generate a temporary user ID
      preferences.userId = crypto.randomUUID();
    }

    // Calculate scores for all neighborhoods
    const calculatedMatches = neighborhoods.map(neighborhood => {
      // Convert amenities string to array
      const neighborhoodPrefs = {
        ...preferences,
        amenities: JSON.parse(preferences.amenities)
      };
      const score = MatchingAlgorithm.calculateMatchScore(neighborhood, neighborhoodPrefs);
      return {
        id: neighborhood.id.toString(),
        name: neighborhood.name,
        score
      };
    });

    // Sort matches by score descending
    calculatedMatches.sort((a, b) => b.score - a.score);
    setMatches(calculatedMatches);

    // Save preferences and matches
    const userPreference = await prisma.userPreference.create({
      data: {
        ...preferences,
        userId: preferences.userId
      }
    });

    // Save matches
    await Promise.all(
      calculatedMatches.map(async (neighborhoodMatch) => {
        const matchResult = await prisma.match.create({
          data: {
            userId: preferences.userId,
            neighborhoodId: parseInt(neighborhoodMatch.id),
            score: neighborhoodMatch.score
          }
        });
      })
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 drop-shadow-md">
            Find Your Perfect Neighborhood
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the perfect place to call home based on your lifestyle preferences and needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Preferences Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Preferences</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Monthly Budget</label>
                <div className="relative">
                  <input
                    type="number"
                    value={preferences.budget}
                    onChange={(e) => setPreferences({ ...preferences, budget: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your monthly budget"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Maximum Commute Time</label>
                <div className="relative">
                  <input
                    type="number"
                    value={preferences.commuteTime}
                    onChange={(e) => setPreferences({ ...preferences, commuteTime: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter maximum commute time in minutes"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">min</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Preferred Amenities</label>
                <select
                  multiple
                  value={preferences.amenities}
                  onChange={(e) => setPreferences({ ...preferences, amenities: JSON.stringify(Array.from(e.target.selectedOptions, option => option.value)) })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="park">Parks & Recreation</option>
                  <option value="school">Schools & Education</option>
                  <option value="grocery">Grocery Stores</option>
                  <option value="restaurant">Restaurants & Dining</option>
                  <option value="public_transport">Public Transportation</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Preference Weights</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Safety', value: 'safetyWeight' },
                    { label: 'Commute', value: 'commuteWeight' },
                    { label: 'Amenities', value: 'amenitiesWeight' },
                    { label: 'Walkability', value: 'walkabilityWeight' }
                  ].map((item) => (
                    <div key={item.value} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{item.label}</span>
                        <span className="text-sm font-medium text-gray-800">
                          {(preferences[item.value as keyof typeof preferences] * 100).toFixed(0)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={preferences[item.value as keyof typeof preferences]}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setPreferences({ ...preferences, [item.value]: value });
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleCalculateMatches}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-4"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finding Your Perfect Neighborhood...
                  </>
                ) : (
                  'Find My Perfect Neighborhood'
                )}
              </Button>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Best Matches</h2>
            {error ? (
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {matches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{match.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm text-gray-600">Match Score:</span>
                          <span className="text-blue-600 font-medium">{match.score}%</span>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${match.score}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-2xl">
                          {match.score >= 80 ? '⭐⭐⭐⭐⭐' : match.score >= 60 ? '⭐⭐⭐⭐' : '⭐⭐⭐'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
  );
}
