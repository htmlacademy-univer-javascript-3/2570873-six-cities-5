import ReviewItem from '@components/review-item/review-item';
import { useMemo } from 'react';
import { Reviews } from '../../app/types/review';
import './review-list.scss';

type ReviewsListProps = {
    reviews?: Reviews;
};

export default function ReviewsList({
  reviews,
}: ReviewsListProps): JSX.Element {
  const sortedReviews = useMemo(
    () =>
      reviews
        ? [...reviews]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 10)
        : [],
    [reviews]
  );

  return (
    <div>
      {sortedReviews.length > 0 ? (
        <ul className="reviews__list">
          {sortedReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
      ) : (
        <p className="reviews__empty">No reviews available</p>
      )}
    </div>
  );
}
