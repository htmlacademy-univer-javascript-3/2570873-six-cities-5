import ReviewItem from '@components/review-item/review-item';
import { Reviews } from '../../app/types/review';

type ReviewsListProps = {
  reviews: Reviews | undefined;
};

export default function ReviewsList({
  reviews,
}: ReviewsListProps): JSX.Element {
  const sortedReviews = reviews
    ? [...reviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10)
    : [];

  return (
    <div>
      {sortedReviews && sortedReviews.length > 0 ? (
        <ul className="reviews__list">
          {sortedReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '32px' }}>
          No reviews available
        </p>
      )}
    </div>
  );
}
