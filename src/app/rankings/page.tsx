'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy,
  Star,
  MapPin,
  TrendingUp,
  Users,
  DollarSign,
  Shield,
  Car,
  TreePine,
  Utensils,
  ChevronDown,
  ChevronUp,
  Filter,
  Search
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Demo ranking data
const rankingCategories = [
  { id: 'overall', name: 'Overall Best', icon: Trophy, description: 'Top neighborhoods across all metrics' },
  { id: 'safety', name: 'Safest Areas', icon: Shield, description: 'Lowest crime rates and highest security' },
  { id: 'value', name: 'Best Value', icon: DollarSign, description: 'Great quality of life for the price' },
  { id: 'family', name: 'Family Friendly', icon: Users, description: 'Perfect for raising children' },
  { id: 'commute', name: 'Best Commute', icon: Car, description: 'Easy access to downtown and transport' },
  { id: 'walkable', name: 'Most Walkable', icon: TreePine, description: 'Everything within walking distance' },
  { id: 'dining', name: 'Foodie Paradise', icon: Utensils, description: 'Amazing restaurants and cafes' }
];

const demoRankings = {
  overall: [
    { rank: 1, name: 'Riverside Heights', score: 94, change: '+2', city: 'San Francisco', price: '$4,200', safety: 95, walkability: 92, dining: 90, image: '🏘️' },
    { rank: 2, name: 'Garden District', score: 92, change: '0', city: 'New Orleans', price: '$2,800', safety: 88, walkability: 95, dining: 94, image: '🌺' },
    { rank: 3, name: 'Tech Hub Central', score: 90, change: '+1', city: 'Austin', price: '$3,500', safety: 85, walkability: 88, dining: 85, image: '🏢' },
    { rank: 4, name: 'Historic Commons', score: 88, change: '-2', city: 'Boston', price: '$3,800', safety: 92, walkability: 85, dining: 82, image: '🏛️' },
    { rank: 5, name: 'Artisan Quarter', score: 87, change: '+3', city: 'Portland', price: '$2,900', safety: 80, walkability: 90, dining: 92, image: '🎨' },
    { rank: 6, name: 'Coastal Marina', score: 85, change: '-1', city: 'Seattle', price: '$4,000', safety: 88, walkability: 80, dining: 88, image: '⛵' },
    { rank: 7, name: 'University Heights', score: 83, change: '+1', city: 'Ann Arbor', price: '$2,200', safety: 85, walkability: 88, dining: 75, image: '🎓' },
    { rank: 8, name: 'Downtown Core', score: 82, change: '0', city: 'Denver', price: '$3,200', safety: 78, walkability: 95, dining: 85, image: '🌆' }
  ],
  safety: [
    { rank: 1, name: 'Historic Commons', score: 92, change: '+1', city: 'Boston', price: '$3,800', safety: 92, walkability: 85, dining: 82, image: '🏛️' },
    { rank: 2, name: 'Riverside Heights', score: 95, change: '0', city: 'San Francisco', price: '$4,200', safety: 95, walkability: 92, dining: 90, image: '🏘️' },
    { rank: 3, name: 'Garden District', score: 88, change: '+2', city: 'New Orleans', price: '$2,800', safety: 88, walkability: 95, dining: 94, image: '🌺' },
    { rank: 4, name: 'Coastal Marina', score: 88, change: '+1', city: 'Seattle', price: '$4,000', safety: 88, walkability: 80, dining: 88, image: '⛵' },
    { rank: 5, name: 'University Heights', score: 85, change: '-2', city: 'Ann Arbor', price: '$2,200', safety: 85, walkability: 88, dining: 75, image: '🎓' }
  ],
  value: [
    { rank: 1, name: 'University Heights', score: 83, change: '+3', city: 'Ann Arbor', price: '$2,200', safety: 85, walkability: 88, dining: 75, image: '🎓' },
    { rank: 2, name: 'Garden District', score: 92, change: '+1', city: 'New Orleans', price: '$2,800', safety: 88, walkability: 95, dining: 94, image: '🌺' },
    { rank: 3, name: 'Artisan Quarter', score: 87, change: '0', city: 'Portland', price: '$2,900', safety: 80, walkability: 90, dining: 92, image: '🎨' },
    { rank: 4, name: 'Downtown Core', score: 82, change: '+2', city: 'Denver', price: '$3,200', safety: 78, walkability: 95, dining: 85, image: '🌆' },
    { rank: 5, name: 'Tech Hub Central', score: 90, change: '-1', city: 'Austin', price: '$3,500', safety: 85, walkability: 88, dining: 85, image: '🏢' }
  ]
};

export default function RankingsPage() {
  const [selectedCategory, setSelectedCategory] = useState('overall');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const currentRankings = demoRankings[selectedCategory] || demoRankings.overall;
  const filteredRankings = currentRankings.filter(neighborhood =>
    neighborhood.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    neighborhood.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCategoryData = rankingCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <motion.section 
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-zinc-900 to-zinc-950"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div variants={fadeInUp} className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
            >
              Neighborhood Rankings
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl lg:text-2xl text-zinc-300 mb-8 leading-relaxed"
            >
              Discover the top-rated neighborhoods based on real data and community feedback. 
              Find your perfect match with our comprehensive ranking system.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="outline" className="bg-zinc-900/80 border-zinc-700 text-zinc-300 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                Updated Daily
              </Badge>
              <Badge variant="outline" className="bg-zinc-900/80 border-zinc-700 text-zinc-300 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                Real Reviews
              </Badge>
              <Badge variant="outline" className="bg-zinc-900/80 border-zinc-700 text-zinc-300">
                500+ Neighborhoods
              </Badge>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
            {/* Categories Sidebar */}
            <motion.div 
              variants={slideInLeft} 
              initial="initial" 
              animate="animate"
              className="xl:col-span-1"
            >
              <Card className="border-zinc-800 bg-zinc-900/50 p-4 sm:p-6 sticky top-24">
                <CardHeader className="p-0 mb-4 sm:mb-6">
                  <CardTitle className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Categories
                  </CardTitle>
                </CardHeader>
                
                <div className="space-y-2">
                  {rankingCategories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                          isSelected 
                            ? 'bg-blue-500 text-white shadow-lg' 
                            : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-zinc-400'}`} />
                          <div>
                            <div className="font-medium text-sm">{category.name}</div>
                            <div className={`text-xs ${isSelected ? 'text-blue-100' : 'text-zinc-500'}`}>
                              {category.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Rankings Content */}
            <motion.div 
              variants={slideInRight} 
              initial="initial" 
              animate="animate"
              className="xl:col-span-3"
            >
              {/* Search and Filter Header */}
              <Card className="border-zinc-800 bg-zinc-900/50 mb-6">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <CardTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                        {selectedCategoryData?.icon && <selectedCategoryData.icon className="w-6 h-6" />}
                        {selectedCategoryData?.name || 'Rankings'}
                      </CardTitle>
                      <p className="text-zinc-400 mt-1 text-sm sm:text-base">
                        {selectedCategoryData?.description || 'Top neighborhoods across all metrics'}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs sm:text-sm">
                      {filteredRankings.length} Results
                    </Badge>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Search neighborhoods or cities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                    />
                  </div>
                </CardHeader>
              </Card>

              {/* Rankings List */}
              <motion.div 
                variants={staggerChildren}
                initial="initial"
                animate="animate"
                className="space-y-4"
              >
                <AnimatePresence mode="wait">
                  {filteredRankings.map((neighborhood, index) => (
                    <motion.div
                      key={`${selectedCategory}-${neighborhood.rank}`}
                      variants={fadeInUp}
                      layout
                      className="group"
                    >
                      <Card className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 transition-all duration-200 group-hover:border-zinc-700">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            {/* Rank and Image */}
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-lg sm:text-xl">
                                #{neighborhood.rank}
                              </div>
                              <div className="text-2xl sm:text-3xl">{neighborhood.image}</div>
                            </div>

                            {/* Main Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                <div>
                                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                    {neighborhood.name}
                                  </h3>
                                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {neighborhood.city}
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  <div className="text-right">
                                    <div className="text-xl sm:text-2xl font-bold text-white">{neighborhood.score}</div>
                                    <div className="text-xs text-zinc-400">Score</div>
                                  </div>
                                  
                                  {neighborhood.change !== '0' && (
                                    <Badge 
                                      variant={neighborhood.change.startsWith('+') ? 'success' : 'destructive'}
                                      className="text-xs"
                                    >
                                      {neighborhood.change}
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {/* Metrics */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <Shield className="w-4 h-4 text-green-400" />
                                  <span className="text-zinc-400">Safety:</span>
                                  <span className="font-medium text-white">{neighborhood.safety}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <TreePine className="w-4 h-4 text-blue-400" />
                                  <span className="text-zinc-400">Walk:</span>
                                  <span className="font-medium text-white">{neighborhood.walkability}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Utensils className="w-4 h-4 text-orange-400" />
                                  <span className="text-zinc-400">Dining:</span>
                                  <span className="font-medium text-white">{neighborhood.dining}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <DollarSign className="w-4 h-4 text-yellow-400" />
                                  <span className="text-zinc-400">Rent:</span>
                                  <span className="font-medium text-white">{neighborhood.price}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredRankings.length === 0 && (
                <motion.div variants={fadeInUp} className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
                  <p className="text-zinc-400">Try adjusting your search terms or browse all categories.</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 