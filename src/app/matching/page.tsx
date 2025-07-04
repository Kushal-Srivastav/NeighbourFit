"use client";
import React from "react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockPrisma as prisma } from '@/lib/mock-prisma';
import { MatchingAlgorithm } from '@/lib/matching';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { UserPreference, Neighborhood, Match, Review } from '@/types';

const MOCK_REVIEWS = [
  {
    reviewer: "Alex P.",
    review: "Great community and lots of parks nearby!",
    rating: 5
  },
  {
    reviewer: "Sam R.",
    review: "Quiet, safe, but a bit far from downtown.",
    rating: 4
  },
  {
    reviewer: "Priya S.",
    review: "Amazing schools and friendly neighbors.",
    rating: 5
  },
  {
    reviewer: "Chris L.",
    review: "Affordable and close to public transport.",
    rating: 4
  }
];

function getMockRating(name: string) {
  // Deterministically generate a rating based on name
  return 3 + (name.charCodeAt(0) % 3);
}

function getMockReviews(name: string) {
  // Pick 2 random reviews for each neighborhood
  const idx = name.charCodeAt(1) % (MOCK_REVIEWS.length - 1);
  return [MOCK_REVIEWS[idx], MOCK_REVIEWS[(idx + 1) % MOCK_REVIEWS.length]];
}

export default function MatchingPage() {
  const router = useRouter();
  // Amenities dropdown state
  const amenitiesOptions: { value: string; label: string }[] = [
    { value: "park", label: "Parks & Recreation" },
    { value: "school", label: "Schools & Education" },
    { value: "grocery", label: "Grocery Stores" },
    { value: "restaurant", label: "Restaurants & Dining" },
    { value: "public_transport", label: "Public Transportation" }
  ];
  const [showAmenitiesDropdown, setShowAmenitiesDropdown] = useState(false);

  // Click-away handler for amenities dropdown
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      const dropdown = document.getElementById('amenities-dropdown');
      if (dropdown && !dropdown.contains(e.target as Node)) {
        setShowAmenitiesDropdown(false);
      }
    }
    if (showAmenitiesDropdown) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showAmenitiesDropdown]);

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
  const [search, setSearch] = useState("");
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
          className="flex justify-center mb-12"
        >
          <div className="rounded-2xl border-2 border-blue-300 bg-white/70 shadow-lg px-8 py-6 flex flex-col items-center max-w-2xl w-full">
            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 drop-shadow-md">
              Find Your Perfect Neighborhood
            </h1>
            <p className="text-gray-700 text-lg text-center">
              Discover the perfect place to call home based on your lifestyle preferences and needs
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Preferences Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-2xl shadow-xl p-8 bg-gray-100 overflow-hidden"
          >
            {/* Gradient overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-100/70 via-amber-100/40 to-gray-100/80 opacity-70"></div>
            <div className="relative z-10">

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
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Amenities</label>
<div className="relative" id="amenities-dropdown">
  <button
    type="button"
    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    onClick={() => setShowAmenitiesDropdown((v) => !v)}
  >
    {JSON.parse(preferences.amenities).length > 0
      ? amenitiesOptions.filter((opt) => JSON.parse(preferences.amenities).includes(opt.value)).map((opt) => opt.label).join(", ")
      : "Select amenities..."}
    <span className="float-right">▼</span>
  </button>
  {showAmenitiesDropdown && (
    <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20">
      {amenitiesOptions.map((opt) => (
        <label key={opt.value} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
          <input
            type="checkbox"
            checked={JSON.parse(preferences.amenities).includes(opt.value)}
            onChange={e => {
              const arr: string[] = JSON.parse(preferences.amenities);
              if (e.target.checked) {
                if (!arr.includes(opt.value)) arr.push(opt.value);
              } else {
                const idx = arr.indexOf(opt.value);
                if (idx > -1) arr.splice(idx, 1);
              }
              setPreferences({ ...preferences, amenities: JSON.stringify(arr) });
            }}
            className="mr-2"
          />
          {opt.label}
        </label>
      ))}
    </div>
  )}
</div>
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
          </div>{/* close relative z-10 */}
        </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-200 rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nearby Neighborhoods</h2>
            <input
              type="text"
              placeholder="Search neighborhoods..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full mb-6 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-stone-900"
            />
            {error ? (
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {matches
                  .filter(match => match.name.toLowerCase().includes(search.toLowerCase()))
                  .map((match, index) => {
                    const rating = getMockRating(match.name);
                    const reviews = getMockReviews(match.name);
                    return (
                      <motion.div
                        key={match.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-amber-100 p-4 rounded-lg shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg text-stone-900">{match.name}</h3>
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
                            <div className="flex items-center mt-2">
                              <span className="text-yellow-500 text-xl mr-2">
                                {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                              </span>
                              <span className="text-sm text-gray-700">{rating}.0</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <span className="font-semibold text-stone-900">User Reviews:</span>
                          <ul className="mt-1 space-y-1">
                            {reviews.map((rev, i) => (
                              <li key={i} className="text-sm text-stone-900 bg-amber-50 rounded px-2 py-1">
                                <span className="font-bold">{rev.reviewer}:</span> {rev.review} {' '}
                                <span className="text-yellow-500">{'★'.repeat(rev.rating)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
  }

