import { AppRoute, AuthorizationStatus, CardImageWrapperClass, CardType } from '@const';
import { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Offer } from 'types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateFavoriteStatusAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type PlaceCardProps = {
  offer: Offer;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  cardType: CardType;
};

function PlaceCard({
  offer,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  cardType,
}: PlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleFavoriteClick = useCallback(() => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
    } else {
      dispatch(
        updateFavoriteStatusAction({
          id: offer.id,
          isFavorite: !offer.isFavorite,
        })
      );
    }
  }, [authorizationStatus, navigate, dispatch, offer.id, offer.isFavorite]);

  return (
    <article
      className={`${cardType} place-card`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={`${CardImageWrapperClass[cardType]} place-card__image-wrapper`}
      >
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={cardType === CardType.Favorites ? 150 : 260}
            height={cardType === CardType.Favorites ? 110 : 200}
            alt="Place image"
          />
        </Link>
      </div>
      <div
        className={`${
          cardType === CardType.Favorites ? 'favorites__card-info' : ''
        } place-card__info`}
      >
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

const MemoizedPlaceCard = memo(
  PlaceCard,
  (prevProps, nextProps) =>
    prevProps.offer.id === nextProps.offer.id &&
    prevProps.offer.isFavorite === nextProps.offer.isFavorite
);

export default MemoizedPlaceCard;
