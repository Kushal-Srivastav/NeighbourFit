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
  const [categoryRatings, setCategoryRatings] = useState<Record<string, number>>({
    safety: 5,
    nightlife: 5,
    parks: 5,
    cleanliness: 5,
    connectivity: 5,
    'network coverage': 5,
  });
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
        categoryRatings: typeof r.categoryRatings === 'string' ? JSON.parse(r.categoryRatings) : r.categoryRatings
      }));
      setReviews(mapped);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
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
        body: JSON.stringify({ area, content: reviewContent.trim(), categoryRatings, userId: user?.id || authorName.trim() || 'Anonymous' })
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
        categoryRatings: typeof r.categoryRatings === 'string' ? JSON.parse(r.categoryRatings) : (r.categoryRatings || categoryRatings)
      };
      setReviews((prev: Review[]) => [newReview, ...prev]);
      setSubmitSuccess(true);
      setSubmitError(null);
      setReviewContent('');
      setAuthorName('');
      setCategoryRatings({
        safety: 5,
        nightlife: 5,
        parks: 5,
        cleanliness: 5,
        connectivity: 5,
        'network coverage': 5,
      });
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  // Utility to render stars for ratings
  const renderStars = (rating: number, interactive = false, size: string = 'md') => {
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

  return (
    <div className="flex flex-col h-full pt-24">
      <section className="flex-grow pt-0">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
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
                    avgRatings={avgRatings} 
                    categories={categories}
                  />
                )}
                {/* Individual Reviews */}
                <ReviewList 
                  reviews={reviews} 
                  onEdit={handleEditReview} 
                  onDelete={handleDeleteReview} 
                />
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                key="review-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 sm:p-6 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors bg-zinc-800/50"
              >
                <h2 className="text-base sm:text-lg font-medium text-white mb-4">Write a Review</h2>
                <ReviewForm
                  area={area}
                  setArea={setArea}
                  authorName={authorName}
                  setAuthorName={setAuthorName}
                  categoryRatings={categoryRatings}
                  setCategoryRatings={setCategoryRatings}
                  reviewContent={reviewContent}
                  setReviewContent={setReviewContent}
                  onSubmit={handleSubmitReview}
                  categories={categories}
                  renderStars={renderStars}
                  submitting={submitting}
                  submitError={submitError}
                  submitSuccess={submitSuccess}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
