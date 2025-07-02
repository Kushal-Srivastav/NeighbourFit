'use client';

import { useState } from 'react';

interface Review {
  id: number;
  area: string;
  content: string;
  authorId: string | null;
  createdAt: string;
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 drop-shadow-md">
            Share Your Neighborhood Experience
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Help others discover the perfect neighborhood by sharing your insights and experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Find Reviews</h2>
            <div className="flex mb-4">
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Enter area name..."
                className="flex-grow form-control"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="btn-primary"
                type="button"
              >
                {loading ? 'Searching...' : 'Search Reviews'}
              </button>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Reviews Found:</h3>
              {reviews.length === 0 && !loading && !error && (
                <p className="text-gray-600">No reviews found for this area yet.</p>
              )}
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-100 p-4 rounded-md shadow-sm mb-4">
                  <p className="font-medium text-lg">{review.content}</p>
                  <p className="text-sm text-gray-500 mt-2">By {review.authorId || 'Anonymous'} on {new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Share Your Experience</h2>
            {submitSuccess && (
              <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
                Review submitted successfully!
              </div>
            )}
            {submitError && (
              <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
                {submitError}
              </div>
            )}
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name (Optional)</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Enter your name"
                  className="form-control"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                <textarea
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  placeholder="Share your experience..."
                  className="form-control h-32"
                  rows={4}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full"
              >
                {submitting ? (
                  <>
                    Submitting...
                  </>
                ) : (
                  'Submit Review'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
