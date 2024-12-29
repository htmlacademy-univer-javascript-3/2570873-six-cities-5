import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { makeFakeReviews } from '../../mocks/mocks';
import ReviewsList from './review-list';

describe('Component: ReviewsList', () => {
  it('should render reviews correctly when reviews are provided', () => {
    const reviews = makeFakeReviews(5);

    render(<ReviewsList reviews={reviews} />);

    // Проверяем, что список отзывов отобразился
    const reviewItems = screen.getAllByRole('listitem');
    expect(reviewItems).toHaveLength(5);

    // Проверяем, что отзывы отсортированы по дате
    const sortedReviews = [...reviews].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    reviewItems.forEach((item, index) => {
      expect(item).toHaveTextContent(sortedReviews[index].comment);
    });
  });

  it('should render at most 10 reviews when more than 10 are provided', () => {
    const reviews = makeFakeReviews(15);

    render(<ReviewsList reviews={reviews} />);

    const reviewItems = screen.getAllByRole('listitem');
    expect(reviewItems).toHaveLength(10);
  });

  it('should display a message when no reviews are available', () => {
    render(<ReviewsList reviews={[]} />);

    const emptyMessage = screen.getByText(/no reviews available/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('should handle undefined reviews gracefully', () => {
    render(<ReviewsList />);

    const emptyMessage = screen.getByText(/no reviews available/i);
    expect(emptyMessage).toBeInTheDocument();
  });
});
