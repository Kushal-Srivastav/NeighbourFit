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
    <div className="bg-zinc-800 rounded-lg shadow p-4 text-left">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-white">{review.authorId || 'Anonymous'}</span>
        <span className="text-xs text-zinc-400">{new Date(review.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="mb-2 text-zinc-200">{review.content}</div>
      <div className="flex gap-2 items-center mb-2">
        <span className="text-blue-400 font-bold">{review.category}</span>
        <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          className="text-blue-500 hover:underline text-xs"
          onClick={() => onEdit(review.id, review.content, review.rating, review.category)}
        >
          Edit
        </button>
        <button
          className="text-red-500 hover:underline text-xs"
          onClick={() => onDelete(review.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
