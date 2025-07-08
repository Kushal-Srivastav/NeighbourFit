import React from 'react';
import { Review } from '../types';
import ReviewCard from './ReviewCard';

interface ReviewListProps {
  reviews: Review[];
  onEdit: (reviewId: number, newContent: string, newRating: number, newCategory: string) => void;
  onDelete: (reviewId: number) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, onEdit, onDelete }) => (
  <div className="space-y-4">
    {reviews.map(review => (
      <ReviewCard key={review.id} review={review} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </div>
);

// Always show heading and placeholder if no reviews
const ReviewListWithHeading: React.FC<ReviewListProps> = (props) => (
  <div>
    {/* Only heading and placeholder here, not in parent */}
    {(!props.reviews || props.reviews.length === 0) ? (
      <>
        <h2 className="text-lg font-bold text-white mb-2">Your Reviews</h2>
        <div className="text-zinc-400 text-sm mt-4">No reviews yet.</div>
      </>
    ) : (
      <>
        <h2 className="text-lg font-bold text-white mb-2">Your Reviews</h2>
        <ReviewList {...props} />
      </>
    )}
  </div>
);

export default ReviewListWithHeading;
