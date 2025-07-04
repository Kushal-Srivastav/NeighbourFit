'use client';

import { useState, useEffect } from 'react';

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
    { value: 'safety', label: 'Safety' },
    { value: 'nightlife', label: 'Nightlife' },
    { value: 'parks', label: 'Parks' },
    { value: 'cleanliness', label: 'Cleanliness' },
    { value: 'connectivity', label: 'Connectivity' },
    { value: 'network coverage', label: 'Network Coverage' },
  ];

  // Fetch average ratings for the selected area
  useEffect(() => {
    if (!area) {
      setAvgRatings(null);
      return;
    }
    const fetchAvgRatings = async () => {
      try {
        const res = await fetch('/api/neighborhoods/ratings');
        if (!res.ok) return;
        const data = await res.json();
        const found = data.find((n: any) => n.name.toLowerCase() === area.toLowerCase());
        setAvgRatings(found ? found.ratings : null);
      } catch {
        setAvgRatings(null);
      }
    };
    fetchAvgRatings();
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
      const response = await fetch(`/api/reviews?area=${encodeURIComponent(area)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      setError('Failed to fetch reviews. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewContent.trim()) {
      setSubmitError('Review content is required');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          area,
          authorId: authorName.trim() || null,
          content: reviewContent.trim(),
          category,
          rating,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      setSubmitSuccess(true);
      setSubmitError(null);
      setReviewContent('');
      setAuthorName('');
      // Refresh reviews after successful submission
      await handleSearch();
    } catch (err) {
      setSubmitError('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
  <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-amber-300 to-blue-800 drop-shadow-md">
    Review Your Area
  </h1>
  <p className="text-stone-200 max-w-2xl mx-auto mb-8 text-lg">
    Help others discover the perfect neighborhood by sharing your insights and experiences.
  </p>
</div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 bg-blue-100 rounded-lg px-4 py-2 inline-block">Find Reviews</h2>
            <div className="flex mb-4">
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Enter area name..."
                className="flex-grow form-control"
              />
              <div className="border-2 border-black rounded-full p-2 flex items-center justify-center bg-black text-white">
  <button
    onClick={handleSearch}
    disabled={loading}
    className="btn-primary rounded-lg shadow-md hover:bg-accent-dark transition-all text-white"
    type="button"
  >
    {loading ? 'Searching...' : 'Search Reviews'}
  </button>
</div>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2 bg-blue-100 rounded-lg px-4 py-2 inline-block">Reviews Found:</h3>
              {/* Category Average Rating Viewer */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-stone-700 mb-1">View Average Rating For:</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="form-control bg-blue-50 border-2 border-blue-200 rounded-lg mb-2"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                {area && avgRatings && avgRatings[category] !== undefined && (
                  <div className="p-2 rounded-lg bg-blue-100 border border-blue-300 inline-block">
                    <span className="font-semibold">{categories.find(c => c.value === category)?.label}:</span> <span className="text-yellow-600 font-bold">{avgRatings[category].toFixed(2)} / 5</span>
                  </div>
                )}
              </div>

              {reviews.length === 0 && !loading && !error && (
                <p className="text-gray-600">No reviews found for this area yet.</p>
              )}
              {reviews.map((review) => (
                <div key={review.id} className="bg-white/90 p-4 rounded-lg shadow mb-4 border border-stone-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-black text-white text-xs font-semibold">{review.category}</span>
                    <span className="inline-block px-2 py-1 rounded-full bg-yellow-400 text-black text-xs font-semibold">{review.rating} / 5</span>
                  </div>
                  <p className="font-medium text-lg">{review.content}</p>
                  <p className="text-sm text-gray-500 mt-2">By {review.authorId || 'Anonymous'} on {new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 bg-blue-100 rounded-lg px-4 py-2 inline-block">Share Your Experience</h2>
            {submitSuccess && (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 border border-green-200">
                Review submitted successfully!
              </div>
            )}
            {submitError && (
              <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4 border border-red-200">
                {submitError}
              </div>
            )}
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Your Name (Optional)</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Enter your name"
                  className="form-control bg-white/90 border border-stone-300 text-stone-900 placeholder-stone-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-control bg-blue-50 border-2 border-blue-200 rounded-lg"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="form-control bg-blue-50 border-2 border-blue-200 rounded-lg"
                >
                  {[1,2,3,4,5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Review</label>
                <div className="bg-white border-2 border-blue-200 rounded-lg p-2">
                <textarea
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  placeholder="Share your experience..."
                  className="form-control h-32 bg-transparent border-none shadow-none focus:ring-0"
                  rows={4}
                />
              </div>
              </div>
              <div className="border-2 border-black rounded-full p-2 flex items-center justify-center bg-black text-white">
  <button
    type="submit"
    disabled={submitting}
    className="btn-primary w-full rounded-lg shadow-md hover:bg-accent-dark transition-all text-white"
  >
    {submitting ? (
      <>
        Submitting...
      </>
    ) : (
      'Submit Review'
    )}
  </button>
</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
