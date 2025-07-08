import React from 'react';
import { Review } from '../types';

interface ReviewCardProps {
  review: Review;
  onEdit: (reviewId: number, newContent: string, newRating: number, newCategory: string) => void;
  onDelete: (reviewId: number) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onEdit, onDelete }) => {
  // You can expand this with edit/delete UI as needed
  return (
    <div className="bg-white text-zinc-900 border border-zinc-200 shadow-md rounded-lg p-4 text-left mb-4 max-w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-blue-700 font-bold text-base">{review.area}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-black">{review.authorId || 'Anonymous'}</span>
        <span className="text-xs text-zinc-500">{new Date(review.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="mb-2 text-black">{review.content}</div>
      <div className="flex flex-col gap-1 mb-2">
        {Object.entries(review.categoryRatings).map(([cat, rating]) => (
          <div key={cat} className="flex items-center gap-2">
            <span className="text-blue-700 font-bold capitalize min-w-[110px]">{cat}</span>
            <span className="text-yellow-500">{'★'.repeat(rating)}</span>
            <span className="text-zinc-600">{rating}/5</span>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-2">
        <button
          className="font-bold text-base text-blue-700 hover:text-blue-900 px-2 py-1 rounded transition-colors"
          onClick={() => onEdit(review.id, review.content, review.rating, review.category)}
        >
          Edit
        </button>
        <button
          className="font-bold text-base text-red-600 hover:text-red-800 px-2 py-1 rounded transition-colors"
          onClick={() => onDelete(review.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
