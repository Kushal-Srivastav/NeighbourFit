'use client';
import { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';
import AverageRatingBox from './components/AverageRatingBox';
import { Review } from './types';
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
import { useUser } from '@clerk/nextjs';
export default function ReviewAreaPage() {
  const [area, setArea] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [category, setCategory] = useState('safety');
  const [avgRatings, setAvgRatings] = useState<Record<string, number> | null>(null);
  const [reviewContent, setReviewContent] = useState('');
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
  const { user } = useUser();
  // ...
  // Edit Review
  const handleEditReview = async (reviewId: number, newContent: string, newRating: number, newCategory: string) => {
    try {
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newContent, rating: newRating, category: newCategory })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update review');
      }
      const updated = await res.json();
      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, content: updated.content, rating: updated.rating, category: updated.category } : r));
    } catch (err: any) {
      setError(err.message || 'Failed to update review');
    }
  };
  // Delete Review
  const handleDeleteReview = async (reviewId: number) => {
    try {
      const res = await fetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete review');
      }
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete review');
    }
  };
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
  // Fetch average ratings for the selected area
  useEffect(() => {
    if (!area) {
      setAvgRatings(null);
      return;
    }
    // Fetch real ratings from backend
    const fetchRatings = async () => {
      try {
        const res = await fetch(`/api/reviews/average?area=${encodeURIComponent(area)}`);
        if (!res.ok) {
          throw new Error('Failed to fetch average ratings');
        }
        const data = await res.json();
        setAvgRatings(data);
      } catch (err) {
        setAvgRatings(null);
      }
    };
    fetchRatings();
  }, [area, submitSuccess]);
  const handleSearch = async () => {
  if (!area.trim()) {
    setError('Please enter an area name');
    return;
  }
  setLoading(true);
  setError(null);
  setReviews([]);
  try {
    const res = await fetch(`/api/reviews?area=${encodeURIComponent(area)}`);
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to fetch reviews');
    }
    const apiReviews = await res.json();
    // Map API response to frontend model
    const mapped = (Array.isArray(apiReviews) ? apiReviews : []).map((r: any) => ({
      id: r.id,
      area: r.neighborhood?.name || area,
      content: r.content,
      authorId: r.user?.name || 'Anonymous',
      createdAt: r.createdAt,
      category: r.category,
      rating: r.rating
    }));
    setReviews(mapped);
  } catch (err: any) {
    setError(err.message || 'Failed to fetch reviews');
  } finally {
    setLoading(false);
  }
}
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

  // Submit Review Handler (must be inside the component to access state)
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
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ area, content: reviewContent.trim(), category, rating, authorId: authorName.trim() || 'Anonymous' })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit review');
      }
      const r = await res.json();
      // Map API response to frontend model
      const newReview = {
        id: r.id,
        area: r.neighborhood?.name || area,
        content: r.content,
        authorId: r.user?.name || 'Anonymous',
        createdAt: r.createdAt,
        category: r.category,
        rating: r.rating
      };
      setReviews((prev: Review[]) => [newReview, ...prev]);
      setSubmitSuccess(true);
      setSubmitError(null);
      setReviewContent('');
      setAuthorName('');
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  // Utility to render stars for ratings
  const renderStars = (rating: number, interactive = false, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClass = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'} ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && setRating(star)}
          />
        ))}
      </div>
    );
  };

          <motion.div
            key="reviews"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Average Ratings Summary */}
            {avgRatings && (
              <AverageRatingBox 
                area={area} 
                avgRatings={avgRatings} 
              />
            )}
            {/* Individual Reviews */}
            <ReviewList 
              reviews={reviews} 
              user={user} 
              handleEditReview={handleEditReview} 
              handleDeleteReview={handleDeleteReview} 
            />
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
                              {user && review.authorId === user.id && (
                                <div className="flex gap-2 mt-2">
                                  <Button size="sm" variant="outline" onClick={() => {
                                    const newContent = prompt('Edit your review:', review.content);
                                    if (newContent !== null) handleEditReview(review.id, newContent, review.rating, review.category);
                                  }}>Edit</Button>
                                  <Button size="sm" variant="destructive" onClick={() => handleDeleteReview(review.id)}>Delete</Button>
                                </div>
                              )}
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