import React from 'react';

interface ReviewFormProps {
  area: string;
  setArea: (area: string) => void;
  reviewContent: string;
  setReviewContent: (content: string) => void;
  authorName: string;
  setAuthorName: (name: string) => void;
  categoryRatings: Record<string, number>;
  setCategoryRatings: (ratings: Record<string, number>) => void;
  submitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  onSubmit: (e: React.FormEvent) => void;
  categories: { value: string; label: string; icon: React.ElementType }[];
  renderStars: (rating: number, interactive?: boolean, size?: string) => React.ReactNode;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  area,
  setArea,
  reviewContent,
  setReviewContent,
  authorName,
  setAuthorName,
  categoryRatings,
  setCategoryRatings,
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
        onChange={e => setArea(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100"
        placeholder="Enter neighborhood or area name"
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
    <div className="mb-4">
      <label className="block text-zinc-300 mb-1">Rate Each Category</label>
      <div className="flex flex-col gap-2">
        {categories.map(cat => (
          <div key={cat.value} className="flex items-center gap-4">
            <span className="w-32 text-zinc-200">{cat.label}</span>
            <div className="flex items-center">
              {[1,2,3,4,5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={`mx-0.5 ${star <= (categoryRatings[cat.value] || 0) ? 'text-yellow-400' : 'text-gray-400'}`}
                  onClick={() => setCategoryRatings({ ...categoryRatings, [cat.value]: star })}
                  aria-label={`Rate ${cat.label} ${star} stars`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.176 0l-3.385 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                  </svg>
                </button>
              ))}
            </div>
            <span className="ml-2 text-zinc-400">{categoryRatings[cat.value] || 0}/5</span>
          </div>
        ))}
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
