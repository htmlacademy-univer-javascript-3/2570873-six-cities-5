export const Setting = {
  PlacesCount: 312,
};

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Favorite = '/favorite',
  Comments = '/comments',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export enum CardType {
  Regular = 'cities__card',
  Nearest = 'near-places__card',
  Favorites = 'favorites__card',
}

export const CardImageWrapperClass = {
  [CardType.Regular]: 'cities__image-wrapper',
  [CardType.Nearest]: 'near-places__image-wrapper',
  [CardType.Favorites]: 'favorites__image-wrapper',
};

export const MapClassName = {
  Offer: 'offer__map map',
  Main: 'cities__map map',
};

export const Cities = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
  },
];

export enum SortOption {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export enum NameSpace {
  App = 'APP',
  User = 'USER',
  CurrentOffer = 'CURRENT_OFFER',
  Offers = 'OFFERS',
}
