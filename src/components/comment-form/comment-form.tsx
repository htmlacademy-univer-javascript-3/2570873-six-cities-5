import React, { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReviewFormData } from 'types/review-data';
import { useAppDispatch } from '../../hooks/index';
import { submitReviewAction } from '../../store/api-actions';

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;

export default function ReviewSendingForm(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<ReviewFormData>({
    review: '',
    rating: 0,
  });

  const isFormValid = useMemo(
    () =>
      formData.rating > 0 &&
      formData.review.length >= MIN_REVIEW_LENGTH &&
      formData.review.length <= MAX_REVIEW_LENGTH,
    [formData]
  );

  const handleFieldChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = evt.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'rating' ? Number(value) : value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      if (!id || !isFormValid) {
        return;
      }

      setIsSubmitting(true);

      dispatch(submitReviewAction({ review: formData, id }))
        .unwrap()
        .then(() => {
          setFormData({ review: '', rating: 0 });
          setErrorMessage(null);
        })
        .catch(() =>
          setErrorMessage('Failed to submit review. Please try again.')
        )
        .finally(() => setIsSubmitting(false));
    },
    [id, dispatch, formData, isFormValid]
  );

  const ratingOptions = useMemo(
    () => [
      { value: 5, title: 'perfect' },
      { value: 4, title: 'good' },
      { value: 3, title: 'not bad' },
      { value: 2, title: 'badly' },
      { value: 1, title: 'terribly' },
    ],
    []
  );

  return (
    <form
      className="reviews__form form"
      onSubmit={handleSubmit}
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratingOptions.map(({ value, title }) => (
          <React.Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              disabled={isSubmitting}
              checked={formData.rating === value}
              onChange={handleFieldChange}
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        onChange={handleFieldChange}
        disabled={isSubmitting}
        value={formData.review}
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        aria-required="true"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </form>
  );
}
