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

export default ReviewList;
