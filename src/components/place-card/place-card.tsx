import { AppRoute, AuthorizationStatus } from '@const';
import { Offer } from 'app/types/offer';
import { OfferDetails } from 'app/types/offer-details';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleFavoriteStatusAction } from '../../store/api-actions';

type PlaceCardProps = {
  offer: Offer | OfferDetails;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export default function PlaceCard({
  offer,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}: PlaceCardProps): JSX.Element {
  let imageSrc = '';
  if ('previewImage' in offer) {
    imageSrc = offer.previewImage;
  } else if (offer.images.length > 0) {
    imageSrc = offer.images[0];
  }
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);


  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
    } else {
      dispatch(toggleFavoriteStatusAction({ id: offer.id, isFavorite: !offer.isFavorite }));
    }
  };

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={imageSrc}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${
              offer.isFavorite ? 'place-card__bookmark-button--active' : ''
            } button`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `calc(100% / 5 * ${offer.rating})` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">
          {offer.type[0].toUpperCase() + offer.type.substring(1)}
        </p>
      </div>
    </article>
  );
}
