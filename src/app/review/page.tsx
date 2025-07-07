'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Search, 
  Star, 
  Send, 
  MapPin, 
  Filter, 
  Users, 
  TrendingUp,
  Shield,
  Moon,
  TreePine,
  Sparkles,
  Wifi,
  Radio,
  ChevronRight,
  Globe,
  Brain,
  Target,
  BookOpen,
  Award,
  Heart,
  ArrowRight,
  Eye,
  CheckCircle,
  Zap,
  Loader2
} from 'lucide-react';

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

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

interface Review {
  id: number;
  area: string;
  content: string;
  authorId: string | null;
  createdAt: string;
  category: string;
  rating: number;
}

export default function ReviewAreaPage() {
  const [area, setArea] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [category, setCategory] = useState('safety');
  const [rating, setRating] = useState(5);
  const [avgRatings, setAvgRatings] = useState<Record<string, number> | null>(null);

  const categories = [
    { value: 'safety', label: 'Safety', icon: Shield },
    { value: 'nightlife', label: 'Nightlife', icon: Moon },
    { value: 'parks', label: 'Parks', icon: TreePine },
    { value: 'cleanliness', label: 'Cleanliness', icon: Sparkles },
    { value: 'connectivity', label: 'Connectivity', icon: Wifi },
    { value: 'network coverage', label: 'Network Coverage', icon: Radio },
  ];

  const stats = [
    { icon: Brain, value: "AI-Powered", label: "Insights" },
    { icon: Globe, value: "1000+", label: "Reviews" },
    { icon: Users, value: "Local", label: "Community" },
    { icon: Zap, value: "Real-time", label: "Updates" }
  ];

  // Demo reviews data
  const demoReviews = [
    {
      id: 1,
      area: "Downtown",
      content: "Great area with lots of restaurants and nightlife. Very walkable and safe at night. Perfect for young professionals.",
      authorId: "Alex Chen",
      createdAt: "2024-01-15",
      category: "safety",
      rating: 5
    },
    {
      id: 2,
      area: "Downtown",
      content: "Can get quite noisy on weekends, but the convenience is unbeatable. Public transport is excellent.",
      authorId: "Sarah M.",
      createdAt: "2024-01-10",
      category: "connectivity",
      rating: 4
    },
    {
      id: 3,
      area: "Riverside",
      content: "Beautiful parks and great for families. Schools are top-notch and the community is very friendly.",
      authorId: "Mike Johnson",
      createdAt: "2024-01-12",
      category: "parks",
      rating: 5
    },
    {
      id: 4,
      area: "Tech District",
      content: "Modern buildings and great coworking spaces. Expensive but worth it for the amenities.",
      authorId: "Priya Patel",
      createdAt: "2024-01-08",
      category: "cleanliness",
      rating: 4
    },
    {
      id: 5,
      area: "Arts Quarter",
      content: "Creative and vibrant neighborhood. Lots of galleries and cafes. Great nightlife scene.",
      authorId: "David Kim",
      createdAt: "2024-01-05",
      category: "nightlife",
      rating: 5
    },
    {
      id: 6,
      area: "Suburban Heights",
      content: "Quiet and peaceful. Perfect for families with children. Great schools and parks nearby.",
      authorId: "Lisa Wong",
      createdAt: "2024-01-03",
      category: "safety",
      rating: 5
    }
  ];

  const demoRatings = {
    safety: 4.3,
    nightlife: 4.1,
    parks: 4.6,
    cleanliness: 4.2,
    connectivity: 4.4,
    "network coverage": 4.0
  };

  // Fetch average ratings for the selected area
  useEffect(() => {
    if (!area) {
      setAvgRatings(null);
      return;
    }
    // Set demo ratings immediately
    setAvgRatings(demoRatings);
  }, [area, submitSuccess]);

  const handleSearch = async () => {
    if (!area.trim()) {
      setError('Please enter an area name');
      return;
    }

    setLoading(true);
    setError(null);
    setReviews([]);

    // Simulate loading for better UX
    setTimeout(() => {
      // Filter demo reviews that mention the searched area or show random selection
      const relevantReviews = demoReviews.filter(review => 
        review.area.toLowerCase().includes(area.toLowerCase()) ||
        review.content.toLowerCase().includes(area.toLowerCase())
      );
      
      // If no relevant reviews, show a random selection
      const reviewsToShow = relevantReviews.length > 0 
        ? relevantReviews 
        : demoReviews.sort(() => Math.random() - 0.5).slice(0, 3);
      
      // Add some dynamic content based on searched area
      const dynamicReview = {
        id: Date.now(),
        area: area,
        content: `Recently moved to ${area} and loving it! The community is welcoming and there's always something to do. Great location with good access to amenities.`,
        authorId: "Community Member",
        createdAt: new Date().toISOString().split('T')[0],
        category: "safety",
        rating: Math.floor(Math.random() * 2) + 4 // 4 or 5 stars
      };
      
      setReviews([dynamicReview, ...reviewsToShow]);
      setLoading(false);
    }, 800);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewContent.trim()) {
      setSubmitError('Review content is required');
      return;
    }

    if (!area.trim()) {
      setSubmitError('Please search for an area first');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    // Simulate API call delay for better UX
    setTimeout(() => {
      // Add the new review to the current reviews
      const newReview = {
        id: Date.now(),
        area,
        authorId: authorName.trim() || 'Anonymous',
        content: reviewContent.trim(),
        category,
        rating,
        createdAt: new Date().toISOString().split('T')[0]
      };

      setReviews(prev => [newReview, ...prev]);
      setSubmitSuccess(true);
      setSubmitError(null);
      setReviewContent('');
      setAuthorName('');
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
      
      setSubmitting(false);
    }, 1000);
  };

  const renderStars = (rating: number, interactive = false, size = 'md') => {
    const sizeClass = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating 
                ? 'text-yellow-500 fill-current' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && setRating(star)}
          />
        ))}
      </div>
    );
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
                <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-500" />
                Community Reviews
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight"
            >
              Share Your
              <motion.span 
                className="block text-gradient"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Experience
              </motion.span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl text-zinc-400 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto px-4 sm:px-0"
            >
              Help others find their perfect neighborhood by sharing honest reviews and experiences from your local community.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-zinc-400"
            >
              <div className="flex items-center justify-center gap-2">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                <span>50,000+ Reviews</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current flex-shrink-0" />
                <span>Verified Community</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                <span>Trusted Platform</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Search & Submit Form */}
            <motion.div 
              variants={slideInLeft} 
              initial="initial" 
              animate="animate"
              className="space-y-6 sm:space-y-8"
            >
              {/* Search Reviews */}
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader className="pb-4 sm:pb-6 p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                    <Search className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                    Search Reviews
                  </CardTitle>
                  <p className="text-zinc-400 mt-2 text-sm sm:text-base">
                    Find reviews for any neighborhood to help make your decision.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Enter neighborhood name..."
                      />
                    </div>
                    <Button 
                      onClick={handleSearch}
                      disabled={loading}
                      className="w-full sm:w-auto px-6 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Search className="w-4 h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Search</span>
                        </>
                      )}
                    </Button>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <p className="text-red-600 text-sm">{error}</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              {/* Submit Review */}
              <Card id="review-form" className="bg-zinc-900/50 border-zinc-800">
                <CardHeader className="pb-4 sm:pb-6 p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                    Submit Review
                  </CardTitle>
                  <p className="text-zinc-400 mt-2 text-sm sm:text-base">
                    Share your experience to help others in the community.
                  </p>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <form onSubmit={handleSubmitReview} className="space-y-4 sm:space-y-6">
                    {/* Author Name */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Your Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Enter your name or stay anonymous"
                      />
                    </div>

                    {/* Category Selection */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-3">
                        Review Category
                      </label>
                      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-2 sm:gap-3">
                        {categories.map((cat) => {
                          const Icon = cat.icon;
                          return (
                            <button
                              key={cat.value}
                              type="button"
                              onClick={() => setCategory(cat.value)}
                              className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border transition-colors text-left ${
                                category === cat.value
                                  ? 'border-zinc-600 bg-zinc-700 text-white'
                                  : 'border-zinc-700 hover:bg-zinc-600'
                              }`}
                            >
                              <Icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="text-xs sm:text-sm font-medium truncate">{cat.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-3">
                        Your Rating
                      </label>
                      <div className="flex items-center gap-3">
                        {renderStars(rating, true, 'lg')}
                        <span className="text-zinc-400 font-medium text-sm sm:text-base">{rating}/5</span>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Your Review
                      </label>
                      <textarea
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base"
                        placeholder="Share your honest experience about this neighborhood..."
                        required
                      />
                    </div>

                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <p className="text-red-600 text-sm">{submitError}</p>
                      </motion.div>
                    )}

                    {submitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <p className="text-green-600 text-sm">Review submitted successfully!</p>
                      </motion.div>
                    )}

                    <Button 
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 sm:py-4 bg-white text-black hover:bg-gray-200 font-medium text-sm sm:text-base"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting Review...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Review
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reviews Display */}
            <motion.div 
              variants={slideInRight} 
              initial="initial" 
              animate="animate"
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader className="pb-4 sm:pb-6 p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    Community Reviews
                  </CardTitle>
                  <p className="text-zinc-400 mt-2 text-sm sm:text-base">
                    Real experiences from verified neighborhood residents.
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
                        <p className="text-zinc-400 text-sm sm:text-base">Loading reviews...</p>
                      </motion.div>
                    ) : reviews.length > 0 ? (
                      <motion.div
                        key="reviews"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4 sm:space-y-6"
                      >
                        {/* Average Ratings Summary */}
                        {avgRatings && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 sm:p-6 bg-zinc-800/50 rounded-lg"
                          >
                            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                              Average Ratings for {area}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                              {Object.entries(avgRatings).map(([category, rating]) => (
                                <div key={category} className="flex items-center justify-between">
                                  <span className="text-xs sm:text-sm font-medium text-zinc-300 capitalize">
                                    {category.replace('_', ' ')}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    {renderStars(Math.round(rating), false, 'sm')}
                                    <span className="text-xs sm:text-sm text-zinc-400">
                                      {rating.toFixed(1)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Individual Reviews */}
                        <div className="space-y-3 sm:space-y-4">
                          {reviews.map((review, index) => (
                            <motion.div
                              key={review.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-4 sm:p-6 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors bg-zinc-800/50"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3">
                                <div className="mb-2 sm:mb-0">
                                  <div className="flex flex-col xs:flex-row xs:items-center gap-2 mb-1">
                                    <span className="font-medium text-white text-sm sm:text-base">
                                      {review.authorId || 'Anonymous'}
                                    </span>
                                    <Badge variant="outline" className="bg-zinc-900/80 border-zinc-700 text-zinc-300 text-xs w-fit">
                                      {review.category}
                                    </Badge>
                                  </div>
                                  <div className="flex flex-col xs:flex-row xs:items-center gap-2">
                                    {renderStars(review.rating, false, 'sm')}
                                    <span className="text-xs sm:text-sm text-zinc-400">
                                      {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">{review.content}</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ) : area ? (
                      <motion.div
                        key="no-reviews"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-12"
                      >
                        <MessageSquare className="w-8 h-8 sm:w-12 sm:h-12 text-zinc-400 mx-auto mb-4" />
                        <h3 className="text-base sm:text-lg font-medium text-white mb-2">No Reviews Yet</h3>
                        <p className="text-zinc-400 mb-4 text-sm sm:text-base">
                          Be the first to review {area}!
                        </p>
                        <Button 
                          onClick={() => document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' })}
                          variant="outline"
                          className="border-zinc-600 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs sm:text-sm"
                        >
                          Write First Review
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-12"
                      >
                        <Search className="w-8 h-8 sm:w-12 sm:h-12 text-zinc-400 mx-auto mb-4" />
                        <h3 className="text-base sm:text-lg font-medium text-white mb-2">Search for Reviews</h3>
                        <p className="text-zinc-400 text-sm sm:text-base">
                          Enter a neighborhood name to see what the community is saying.
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
