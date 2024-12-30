import { useMemo } from 'react';
import { Reviews } from 'types/review';
import ReviewItem from '../../components/review-item/review-item';
import './review-list.scss';

type ReviewsListProps = {
  reviews?: Reviews;
};

export default function ReviewsList({
  reviews = [],
}: ReviewsListProps): JSX.Element {
  const latestReviews = useMemo(() => [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10), [reviews]);

  return (
    <div className="reviews__container">
      {latestReviews.length > 0 ? (
        <ul className="reviews__list">
          {latestReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
      ) : (
        <p className="reviews__empty">No reviews available</p>
      )}
    </div>
  );
}
