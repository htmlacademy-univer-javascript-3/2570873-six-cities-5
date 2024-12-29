import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../mocks/mocks';
import ReviewItem from './review-item';

describe('Component: ReviewItem', () => {
  const fakeReview = makeFakeReview();

  it('should render review item correctly', () => {
    const { container } = render(<ReviewItem review={fakeReview} />);

    // Проверяем, что аватар отображается корректно
    const avatar = screen.getByAltText('User avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', fakeReview.user.avatarUrl);

    // Проверяем имя пользователя
    const userName = screen.getByText(fakeReview.user.name);
    expect(userName).toBeInTheDocument();

    // Проверяем статус "Pro", если пользователь является профессионалом
    if (fakeReview.user.isPro) {
      expect(screen.getByText('Pro')).toBeInTheDocument();
    } else {
      expect(screen.queryByText('Pro')).not.toBeInTheDocument();
    }

    // Проверяем текст отзыва
    const reviewText = screen.getByText(fakeReview.comment);
    expect(reviewText).toBeInTheDocument();

    // Проверяем отображение рейтинга
    const ratingStars = container.querySelector('.reviews__stars span');
    expect(ratingStars).toBeInTheDocument();
    expect(ratingStars).toHaveStyle(`width: calc(100% / 5 * ${fakeReview.rating})`);

    // Проверяем дату отзыва
    const formattedDate = new Date(fakeReview.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it('should render correctly when user is not Pro', () => {
    const nonProReview = {
      ...fakeReview,
      user: { ...fakeReview.user, isPro: false },
    };

    render(<ReviewItem review={nonProReview} />);

    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
  });
});
