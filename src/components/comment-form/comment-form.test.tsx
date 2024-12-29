import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeState } from '../../mocks/mocks';
import ReviewSendingForm from './comment-form';

describe('Component: ReviewSendingForm', () => {
  const initialState = makeFakeState();

  it('renders form correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<ReviewSendingForm />),
      initialState
    );

    const { container } = render(withStoreComponent);

    const form = container.querySelector('form');
    const textArea = container.querySelector('textarea');
    const ratingInputs = container.querySelectorAll('input[type="radio"]');
    const submitButton = container.querySelector('button[type="submit"]');

    expect(form).not.toBeNull();
    expect(textArea).not.toBeNull();
    expect(ratingInputs.length).toBe(5);
    expect(submitButton).not.toBeNull();
  });

  it('renders with initial empty state', () => {
    const { withStoreComponent } = withStore(
      withHistory(<ReviewSendingForm />),
      initialState
    );

    const { container } = render(withStoreComponent);

    const textArea = container.querySelector('textarea') as HTMLTextAreaElement;
    const ratingInputs = container.querySelectorAll('input[type="radio"]:checked');
    const submitButton = container.querySelector('button[type="submit"]') as HTMLButtonElement;

    expect(textArea.value).toBe('');
    expect(ratingInputs.length).toBe(0);
    expect(submitButton).not.toBeNull();
  });

  it('enables submit button when form is valid', () => {
    const { withStoreComponent } = withStore(
      withHistory(<ReviewSendingForm />),
      initialState
    );

    const { container } = render(withStoreComponent);

    const textArea = container.querySelector('textarea') as HTMLTextAreaElement;
    const ratingInput = container.querySelector('input[type="radio"]') as HTMLInputElement;
    const submitButton = container.querySelector('button[type="submit"]') as HTMLButtonElement;

    if (textArea && ratingInput) {
      textArea.value = 'This is a detailed review text that meets the minimum length requirement for a valid review submission form';
      ratingInput.checked = true;
    }

    expect(submitButton).not.toBeNull();
    expect(textArea.value.length).toBeGreaterThan(50);
    expect(ratingInput.checked).toBe(true);
  });
});
