"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Search, 
  DollarSign, 
  Loader2, 
  Globe, 
  BarChart3, 
  Shield, 
  TrendingUp,
  Users,
  Star,
  Target,
  ArrowRight,
  Eye
} from "lucide-react";

// Animation variants
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

export default function FindPlacesPage() {
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location.trim()) {
      setError("Please enter a city name");
      return;
    }
    
    setLoading(true);
    setError("");
    setResults(null);
    
    // Simulate loading for better UX
    setTimeout(() => {
      // Demo data for any city
      const demoData = {
        cityName: location,
        overview: `${location} is a vibrant city with excellent quality of life, diverse neighborhoods, and strong economic opportunities. Known for its unique culture and amenities.`,
        safetyScore: Math.floor(Math.random() * 3) + 7.5, // 7.5-10
        costOfLiving: ['Low', 'Moderate', 'High', 'Very High'][Math.floor(Math.random() * 4)],
        qualityOfLife: Math.floor(Math.random() * 1.5) + 8.5, // 8.5-10
        population: Math.floor(Math.random() * 900000) + 100000, // 100k-1M
        medianRent: Math.floor(Math.random() * 2000) + 1500, // $1500-$3500
        walkabilityScore: Math.floor(Math.random() * 25) + 75, // 75-100
        publicTransport: ['Excellent', 'Good', 'Fair'][Math.floor(Math.random() * 3)],
        jobMarket: ['Strong', 'Growing', 'Stable'][Math.floor(Math.random() * 3)],
        weatherRating: Math.floor(Math.random() * 2) + 8, // 8-10
        highlights: [
          'Excellent school system',
          'Vibrant arts and culture scene',
          'Great outdoor recreation',
          'Strong job market',
          'Diverse dining options'
        ].sort(() => Math.random() - 0.5).slice(0, 3)
      };
      
      setResults(demoData);
      setLoading(false);
    }, 1200);
  };

  const features = [
    {
      icon: BarChart3,
      title: "Market Analytics",
      description: "Real-time property values and investment insights"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Access data from 1000+ cities worldwide"
    },
    {
      icon: Shield,
      title: "Verified Data",
      description: "Trusted sources and community-verified information"
    }
  ];

  const popularSearches = [
    "New York", "London", "Tokyo", "San Francisco", "Austin", "Seattle"
  ];

  const stats = [
    { icon: Globe, value: "1000+", label: "Cities" },
    { icon: Users, value: "50k+", label: "Searches" },
    { icon: Star, value: "4.9", label: "Rating" },
    { icon: Target, value: "99%", label: "Accuracy" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <Badge 
                variant="outline" 
                className="mb-6 sm:mb-8 px-3 sm:px-4 py-2 text-xs sm:text-sm bg-zinc-900/80 border-zinc-700 text-zinc-300"
              >
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-500" />
                Global City Discovery
              </Badge>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight"
            >
              Discover Your
              <motion.span 
                className="block text-gradient"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Perfect City
              </motion.span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl text-zinc-400 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto px-4 sm:px-0"
            >
              Search and compare cities worldwide with AI-powered insights, 
              real-time data, and comprehensive market analysis.
            </motion.p>

            {/* Stats */}
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto mb-12 sm:mb-16"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mx-auto mb-2 sm:mb-3" />
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 sm:p-8 bg-zinc-900/50 border-zinc-800">
              <CardHeader className="text-center pb-4 sm:pb-6 px-0">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  Start Your City Search
                </CardTitle>
                <p className="text-zinc-400 mt-2 text-sm sm:text-base">
                  Enter a city name and budget to get detailed insights
                </p>
              </CardHeader>
              
              <CardContent className="px-0">
                <form onSubmit={handleSearch} className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        City Name
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g., San Francisco"
                          className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Budget (Optional)
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <input
                          type="text"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          placeholder="e.g., $5000/month"
                          className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 sm:py-4 text-sm sm:text-base"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Search City
                      </>
                    )}
                  </Button>
                </form>

                {/* Popular Searches */}
                <div className="mt-6 sm:mt-8">
                  <p className="text-zinc-400 text-xs sm:text-sm mb-3 sm:mb-4">Popular searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((city) => (
                      <button
                        key={city}
                        onClick={() => setLocation(city)}
                        className="px-3 py-1.5 text-xs sm:text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition-colors"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
              Powerful City Insights
            </h2>
            <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed">
              Get comprehensive data about cities worldwide
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/80 transition-all duration-300 p-1">
                  <CardHeader className="text-center pb-4">
                    <motion.div 
                      className="mx-auto mb-3 sm:mb-4 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/20 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                    </motion.div>
                    
                    <CardTitle className="text-lg sm:text-xl text-white mb-2 sm:mb-3">{feature.title}</CardTitle>
                    <CardDescription className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      {error && (
        <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-2xl">
            <Card className="bg-red-500/10 border-red-500/20">
              <CardContent className="p-4 sm:p-6">
                <p className="text-red-400 text-center text-sm sm:text-base">{error}</p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {results && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl text-white flex items-center gap-2">
                    <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                    City Analysis for {results.cityName}
                  </CardTitle>
                  <p className="text-zinc-400 mt-2 text-sm sm:text-base">
                    Comprehensive insights and data analysis
                  </p>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-6 sm:space-y-8">
                    {/* Overview */}
                    <div>
                      <h3 className="font-semibold text-white mb-3 text-sm sm:text-base">Overview</h3>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                        {results.overview}
                      </p>
                    </div>

                    {/* Key Metrics Grid */}
                    <div>
                      <h3 className="font-semibold text-white mb-4 text-sm sm:text-base">Key Metrics</h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="bg-zinc-800/50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-400 text-xs sm:text-sm">Safety Score</span>
                            <span className="text-green-400 text-xs sm:text-sm font-bold">
                              {results.safetyScore.toFixed(1)}/10
                            </span>
                          </div>
                        </div>
                        <div className="bg-zinc-800/50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-400 text-xs sm:text-sm">Cost of Living</span>
                            <span className="text-yellow-400 text-xs sm:text-sm font-bold">{results.costOfLiving}</span>
                          </div>
                        </div>
                        <div className="bg-zinc-800/50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-400 text-xs sm:text-sm">Quality of Life</span>
                            <span className="text-blue-400 text-xs sm:text-sm font-bold">
                              {results.qualityOfLife.toFixed(1)}/10
                            </span>
                          </div>
                        </div>
                        <div className="bg-zinc-800/50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-400 text-xs sm:text-sm">Population</span>
                            <span className="text-purple-400 text-xs sm:text-sm font-bold">
                              {results.population.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="bg-zinc-800/50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-400 text-xs sm:text-sm">Median Rent</span>
                            <span className="text-green-400 text-xs sm:text-sm font-bold">
                              ${results.medianRent}/month
                            </span>
                          </div>
                        </div>
                        <div className="bg-zinc-800/50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-400 text-xs sm:text-sm">Walkability</span>
                            <span className="text-blue-400 text-xs sm:text-sm font-bold">
                              {results.walkabilityScore}/100
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-white mb-3 text-sm sm:text-base">City Features</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-400 text-xs sm:text-sm">Public Transport</span>
                            <span className="text-blue-400 text-xs sm:text-sm font-medium">{results.publicTransport}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-400 text-xs sm:text-sm">Job Market</span>
                            <span className="text-green-400 text-xs sm:text-sm font-medium">{results.jobMarket}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-400 text-xs sm:text-sm">Weather Rating</span>
                            <span className="text-yellow-400 text-xs sm:text-sm font-medium">{results.weatherRating}/10</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-3 text-sm sm:text-base">Highlights</h3>
                        <ul className="space-y-2">
                          {results.highlights.map((highlight: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                              <span className="text-zinc-400 text-xs sm:text-sm">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <p className="text-blue-400 font-medium text-sm sm:text-base mb-1">
                            Want personalized neighborhood matches?
                          </p>
                          <p className="text-zinc-400 text-xs sm:text-sm">
                            Get AI-powered recommendations based on your preferences
                          </p>
                        </div>
                        <Button 
                          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 text-sm sm:text-base"
                          onClick={() => window.location.href = '/matching'}
                        >
                          Find Matches
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
