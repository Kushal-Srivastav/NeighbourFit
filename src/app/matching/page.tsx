"use client";
import React from "react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockPrisma as prisma } from '@/lib/mock-prisma';
import { MatchingAlgorithm } from '@/lib/matching';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, 
  Heart, 
  MapPin, 
  DollarSign, 
  Clock, 
  Home as HomeIcon, 
  Star, 
  ArrowRight, 
  Users, 
  Shield, 
  Car, 
  TreePine,
  Sparkles,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Globe,
  Trophy,
  CheckCircle,
  Eye,
  Zap,
  Brain
} from 'lucide-react';
import type { UserPreference, Neighborhood, Match, Review } from '@prisma/client';

// Animation variants - Match Find page exactly
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

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
  return 3 + (name.charCodeAt(0) % 3);
}

function getMockReviews(name: string) {
  const idx = name.charCodeAt(1) % (MOCK_REVIEWS.length - 1);
  return [MOCK_REVIEWS[idx], MOCK_REVIEWS[(idx + 1) % MOCK_REVIEWS.length]];
}

export default function MatchingPage() {
  const router = useRouter();
  
  const amenitiesOptions: { value: string; label: string; icon: any }[] = [
    { value: "park", label: "Parks & Recreation", icon: TreePine },
    { value: "school", label: "Schools & Education", icon: HomeIcon },
    { value: "grocery", label: "Grocery Stores", icon: HomeIcon },
    { value: "restaurant", label: "Restaurants & Dining", icon: HomeIcon },
    { value: "public_transport", label: "Public Transportation", icon: Car }
  ];
  
  const [showAmenitiesDropdown, setShowAmenitiesDropdown] = useState(false);

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

  const [preferences, setPreferences] = useState<Partial<UserPreference>>({});

  // Save preferences to backend on change
  useEffect(() => {
    if (preferences && Object.keys(preferences).length > 0) {
      fetch('/api/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences)
      }).catch(() => {});
    }
  }, [preferences]);
  
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [matches, setMatches] = useState<{ id: string; name: string; score: number; neighborhood?: any }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/neighborhoods');
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to fetch neighborhoods');
        }
        const data = await res.json();
        setNeighborhoods(data.neighborhoods || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch neighborhoods');
      } finally {
        setLoading(false);
      }
    };
    fetchNeighborhoods();
  }, []);

  const handleCalculateMatches = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to fetch matches');
      }
      const matches = await res.json();
      setMatches(matches.map((n: any) => ({
        id: n.id.toString(),
        name: n.name,
        score: n.score,
        neighborhood: n
      })));
    } catch (err: any) {
      setError(err.message || 'Failed to fetch matches');
    } finally {
      setLoading(false);
    }
  };

  const selectedAmenities = preferences.amenities ? JSON.parse(preferences.amenities) : [];

  const toggleAmenity = (amenityValue: string) => {
    const amenities = selectedAmenities.includes(amenityValue)
      ? selectedAmenities.filter((a: string) => a !== amenityValue)
      : [...selectedAmenities, amenityValue];
    setPreferences({ ...preferences, amenities: JSON.stringify(amenities) });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Modern Hero Section */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp}>
              <Badge 
                variant="outline" 
                className="mb-6 sm:mb-8 px-3 sm:px-4 py-2 text-xs sm:text-sm bg-zinc-900/80 border-zinc-700 text-zinc-300"
              >
                <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-500" />
                AI Matching Algorithm
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight"
            >
              Find Your
              <motion.span 
                className="block text-gradient"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Perfect Match
              </motion.span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl text-zinc-400 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto px-4 sm:px-0"
            >
              Tell us your preferences and our advanced AI algorithm will find neighborhoods that perfectly match your lifestyle and budget.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-zinc-400"
            >
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                <span>10,000+ Matches Made</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current flex-shrink-0" />
                <span>4.9/5 Accuracy Rating</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                <span>Instant Results</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Preferences Form */}
            <motion.div variants={slideInLeft} initial="initial" animate="animate">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader className="pb-4 sm:pb-6 p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                    Your Preferences
                  </CardTitle>
                  <p className="text-zinc-400 mt-2 text-sm sm:text-base">
                    Customize your search criteria to find the perfect neighborhood match.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Monthly Budget
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="number"
                        value={preferences.budget || ''}
                        onChange={(e) => setPreferences({ ...preferences, budget: parseInt(e.target.value) || 0 })}
                        className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Enter your budget"
                      />
                    </div>
                  </div>

                  {/* Commute Time */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Max Commute Time (minutes)
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="number"
                        value={preferences.commuteTime || ''}
                        onChange={(e) => setPreferences({ ...preferences, commuteTime: parseInt(e.target.value) || 0 })}
                        className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Enter max commute time"
                      />
                    </div>
                  </div>

                  {/* Amenities Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Important Amenities
                    </label>
                    <div className="relative" id="amenities-dropdown">
                      <button
                        type="button"
                        onClick={() => setShowAmenitiesDropdown(!showAmenitiesDropdown)}
                        className="w-full flex items-center justify-between px-4 py-3 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-zinc-800 text-zinc-300 text-sm sm:text-base"
                      >
                        <span className="text-zinc-300">
                          {selectedAmenities.length > 0 
                            ? `${selectedAmenities.length} amenities selected`
                            : 'Select amenities'
                          }
                        </span>
                        <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${showAmenitiesDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {showAmenitiesDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg"
                          >
                            {amenitiesOptions.map((amenity) => {
                              const Icon = amenity.icon;
                              const isSelected = selectedAmenities.includes(amenity.value);
                              return (
                                <button
                                  key={amenity.value}
                                  type="button"
                                  onClick={() => toggleAmenity(amenity.value)}
                                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-700 first:rounded-t-lg last:rounded-b-lg transition-colors text-sm sm:text-base ${
                                    isSelected ? 'bg-zinc-700' : ''
                                  }`}
                                >
                                  <Icon className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                                  <span className="text-zinc-300 truncate">{amenity.label}</span>
                                  {isSelected && <CheckCircle className="w-4 h-4 text-blue-500 ml-auto flex-shrink-0" />}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    {/* Selected Amenities Display */}
                    {selectedAmenities.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedAmenities.map((amenityValue: string) => {
                          const amenity = amenitiesOptions.find(a => a.value === amenityValue);
                          if (!amenity) return null;
                          return (
                            <Badge 
                              key={amenityValue} 
                              variant="outline" 
                              className="bg-zinc-800 border-zinc-600 text-zinc-300 text-xs"
                            >
                              {amenity.label}
                            </Badge>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Priority Weights */}
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="font-medium text-white text-sm sm:text-base">Priority Weights</h4>
                    
                    {[
                      { key: 'safetyWeight', label: 'Safety', icon: Shield },
                      { key: 'commuteWeight', label: 'Commute', icon: Car },
                      { key: 'amenitiesWeight', label: 'Amenities', icon: HomeIcon },
                      { key: 'walkabilityWeight', label: 'Walkability', icon: MapPin }
                    ].map(({ key, label, icon: Icon }) => (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-400 flex-shrink-0" />
                            <span className="text-xs sm:text-sm font-medium text-zinc-300">{label}</span>
                          </div>
                          <span className="text-xs sm:text-sm text-zinc-400">
                            {Math.round((preferences[key as keyof typeof preferences] as number || 0.25) * 100)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={preferences[key as keyof typeof preferences] as number || 0.25}
                          onChange={(e) => setPreferences({ 
                            ...preferences, 
                            [key]: parseFloat(e.target.value) 
                          })}
                          className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Calculate Button */}
                  <Button 
                    onClick={handleCalculateMatches}
                    disabled={loading}
                    className="w-full py-3 sm:py-4 bg-white text-black hover:bg-gray-200 font-medium text-sm sm:text-base"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Finding Your Matches...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Find My Perfect Match
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results */}
            <motion.div variants={slideInRight} initial="initial" animate="animate">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader className="pb-4 sm:pb-6 p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    Your Matches
                  </CardTitle>
                  <p className="text-zinc-400 mt-2 text-sm sm:text-base">
                    Neighborhoods ranked by compatibility with your preferences.
                  </p>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-12"
                      >
                        <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-zinc-400 mb-4" />
                        <p className="text-zinc-400 text-sm sm:text-base">Analyzing neighborhoods...</p>
                      </motion.div>
                    ) : matches.length > 0 ? (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3 sm:space-y-4"
                      >
                        {matches.slice(0, 10).map((match, index) => {
                          const neighborhood = match.neighborhood;
                          if (!neighborhood) return null;

                          const reviews = getMockReviews(neighborhood.name);
                          const rating = getMockRating(neighborhood.name);

                          return (
                            <motion.div
                              key={match.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-4 sm:p-6 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors bg-zinc-800/50"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4">
                                <div className="mb-3 sm:mb-0">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-base sm:text-lg font-semibold text-white">
                                      {neighborhood.name}
                                    </h3>
                                    <Badge className="bg-zinc-900/80 border-zinc-700 text-zinc-300 text-xs">
                                      #{index + 1}
                                    </Badge>
                                  </div>
                                  <p className="text-xs sm:text-sm text-zinc-400 mb-2 leading-relaxed">
                                    {neighborhood.description}
                                  </p>
                                  <div className="flex items-center gap-1 text-xs sm:text-sm text-zinc-400">
                                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current flex-shrink-0" />
                                    <span>{rating}/5 rating</span>
                                  </div>
                                </div>
                                <div className="text-center sm:text-right">
                                  <div className="text-xl sm:text-2xl font-bold text-white">
                                    {Math.round(match.score)}%
                                  </div>
                                  <div className="text-xs sm:text-sm text-zinc-400">Match</div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm">
                                <div className="flex items-center gap-2">
                                  <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-500 flex-shrink-0" />
                                  <span className="text-zinc-400 truncate">Avg. Rent: ${neighborhood.avgRent.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-500 flex-shrink-0" />
                                  <span className="text-zinc-400">Safety: {neighborhood.safetyScore.toFixed(1)}/10</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Car className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-500 flex-shrink-0" />
                                  <span className="text-zinc-400">Commute: {neighborhood.commuteScore.toFixed(1)}/10</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-500 flex-shrink-0" />
                                  <span className="text-zinc-400">Walk Score: {neighborhood.walkabilityScore}/100</span>
                                </div>
                              </div>

                              {/* Reviews Preview */}
                              <div className="space-y-2 mb-3 sm:mb-4">
                                {reviews.map((review, idx) => (
                                  <div key={idx} className="p-2 sm:p-3 bg-zinc-700/50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-xs sm:text-sm font-medium text-zinc-200">{review.reviewer}</span>
                                      <div className="flex">
                                        {[...Array(review.rating)].map((_, i) => (
                                          <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-500 fill-current" />
                                        ))}
                                      </div>
                                    </div>
                                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{review.review}</p>
                                  </div>
                                ))}
                              </div>

                              <Button 
                                variant="outline" 
                                className="w-full border-zinc-600 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs sm:text-sm py-2 sm:py-3"
                                onClick={() => router.push(`/neighborhood/${neighborhood.id}`)}
                              >
                                View Details
                                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                              </Button>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-12"
                      >
                        <Target className="w-8 h-8 sm:w-12 sm:h-12 text-zinc-400 mx-auto mb-4" />
                        <h3 className="text-base sm:text-lg font-medium text-white mb-2">Ready to Find Your Match?</h3>
                        <p className="text-zinc-400 text-sm sm:text-base">
                          Fill in your preferences and click "Find My Perfect Match" to see your personalized results.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

