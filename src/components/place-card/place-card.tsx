import React from 'react';

type PlaceCardProps = {
  isPremium?: boolean;
  imageSrc: string;
  price: number;
  isBookmarked: boolean;
  rating: number;
  name: string;
  type: string;
};

const PlaceCard: React.FC<PlaceCardProps> = ({
  isPremium,
  imageSrc,
  price,
  isBookmarked,
  rating,
  name,
  type,
}) => (
  <article className="place-card">
    {isPremium && (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    )}
    <div className="place-card__image-wrapper">
      <a href="#">
        <img
          className="place-card__image"
          src={imageSrc}
          width="150"
          height="110"
          alt="Place image"
        />
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button
          className={`place-card__bookmark-button button ${
            isBookmarked ? 'place-card__bookmark-button--active' : ''
          }`}
          type="button"
        >
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">
            {isBookmarked ? 'In bookmarks' : 'To bookmarks'}
          </span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{ width: `${(rating / 5) * 100}%` }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#">{name}</a>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>
);

export default PlaceCard;
