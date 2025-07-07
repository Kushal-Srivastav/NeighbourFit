import React from 'react';

interface ReviewFormProps {
  area: string;
  reviewContent: string;
  setReviewContent: (content: string) => void;
  authorName: string;
  setAuthorName: (name: string) => void;
  category: string;
  setCategory: (category: string) => void;
  rating: number;
  setRating: (rating: number) => void;
  submitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  onSubmit: (e: React.FormEvent) => void;
  categories: { value: string; label: string; icon: React.ElementType }[];
  renderStars: (rating: number, interactive?: boolean, size?: string) => React.ReactNode;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  area,
  reviewContent,
  setReviewContent,
  authorName,
  setAuthorName,
  category,
  setCategory,
  rating,
  setRating,
  submitting,
  submitError,
  submitSuccess,
  onSubmit,
  categories,
  renderStars
}) => (
  <form id="review-form" className="bg-zinc-900 rounded-lg p-6 shadow-lg mb-8" onSubmit={onSubmit}>
    <h2 className="text-xl font-semibold mb-4 text-white">Write a Review</h2>
    <div className="mb-4">
      <label className="block text-zinc-300 mb-1">Area</label>
      <input
        type="text"
        value={area}
        readOnly
        className="w-full px-4 py-2 rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100"
      />
    </div>
    <div className="mb-4">
      <label className="block text-zinc-300 mb-1">Your Name (optional)</label>
      <input
        type="text"
        value={authorName}
        onChange={e => setAuthorName(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100"
        placeholder="Anonymous"
      />
    </div>
    <div className="mb-4">
      <label className="block text-zinc-300 mb-1">Review</label>
      <textarea
        value={reviewContent}
        onChange={e => setReviewContent(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100"
        rows={4}
        required
      />
    </div>
    <div className="mb-4 flex flex-col sm:flex-row gap-4">
      <div>
        <label className="block text-zinc-300 mb-1">Category</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-zinc-300 mb-1">Rating</label>
        <div className="flex items-center">
          {renderStars(rating, true, 'md')}
        </div>
      </div>
    </div>
    {submitError && <div className="text-red-500 mb-2">{submitError}</div>}
    {submitSuccess && <div className="text-green-500 mb-2">Review submitted successfully!</div>}
    <button
      type="submit"
      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
      disabled={submitting}
    >
      {submitting ? 'Submitting...' : 'Submit Review'}
    </button>
  </form>
);

export default ReviewForm;
