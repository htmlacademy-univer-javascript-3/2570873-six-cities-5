import { AppRoute, AuthorizationStatus } from '@const';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewSendingForm from '../../components/comment-form/comment-form';
import Map from '../../components/map/map';
import NearbyOffersList from '../../components/nearby-offers-list/nearby-offers-list';
import ReviewsList from '../../components/review-list/review-list';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import {
  fetchOfferInDetailsAction,
  updateFavoriteStatusAction,
} from '../../store/api-actions';
import {
  getNearbyOffers,
  getOfferInDetails,
  getOfferInDetailsDataLoadingStatus,
  getReviews,
} from '../../store/current-offer-data.ts/selectors';
import { getOffers } from '../../store/offers-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

export const OfferPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const offers = useAppSelector(getOffers);
  const offerInfo = useAppSelector(getOfferInDetails);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const reviews = useAppSelector(getReviews);
  const isOfferInDetailsDataLoading = useAppSelector(
    getOfferInDetailsDataLoadingStatus
  );
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const mainOffer = useMemo(
    () => offers.find((item) => item.id === id),
    [id, offers]
  );

  const handleFavoriteClick = useCallback(() => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
    } else if (mainOffer) {
      dispatch(
        updateFavoriteStatusAction({
          id: mainOffer.id,
          isFavorite: !mainOffer.isFavorite,
        })
      );
    }
  }, [authorizationStatus, navigate, dispatch, mainOffer]);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferInDetailsAction({ id }));
    }
  }, [id, dispatch]);

  if (isOfferInDetailsDataLoading) {
    return <div>Loading ...</div>;
  }

  if (!mainOffer || !offerInfo) {
    return <div>Offer not found</div>;
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offerInfo.images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {mainOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{mainOffer.title}</h1>
                <button
                  className={`offer__bookmark-button ${
                    mainOffer.isFavorite && 'offer__bookmark-button--active'
                  } button`}
                  onClick={handleFavoriteClick}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{ width: `${(mainOffer.rating / 5) * 100}%` }}
                    // eslint-disable-next-line react/jsx-closing-tag-location
                  ></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {mainOffer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offerInfo.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offerInfo.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offerInfo.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{mainOffer.price}</b>
                <span className="offer__price-text">&nbsp;/ night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What’s inside</h2>
                <ul className="offer__inside-list">
                  {offerInfo.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper ${
                      offerInfo.host.isPro && 'offer__avatar-wrapper--pro'
                    } user__avatar-wrapper`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={offerInfo.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {offerInfo.host.name}
                  </span>
                  {offerInfo.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offerInfo.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">
                    {reviews?.length || 0}
                  </span>
                </h2>
                <ReviewsList reviews={reviews} />
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <ReviewSendingForm />
                )}
              </section>
            </div>
          </div>
          <Map
            city={mainOffer.city}
            offers={[mainOffer, ...nearbyOffers.slice(0, 3)]}
            selectedOffer={mainOffer}
          />
        </section>
        <div className="container">
          <div className="container">
            <NearbyOffersList offers={nearbyOffers.slice(0, 3)} />
          </div>
        </div>
      </main>
    </div>
  );
};
