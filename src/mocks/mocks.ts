import { Offers } from 'types/offer';
import { OfferDetails } from 'types/offer-details';
import { Review, Reviews } from 'types/review';

export const mockOffers: Offers = [
  {
    id: 'dc776305-ca30-4960-9639-9862aa34705c',
    title: 'Tile House',
    type: 'house',
    price: 255,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/16.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.7
  },
  {
    id: '023f7924-dfa0-4da1-bcde-46f2f038ec14',
    title: 'Amazing and Extremely Central Flat',
    type: 'house',
    price: 941,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/16.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.385540000000006,
      longitude: 4.902976,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 3
  },
  {
    id: '1f90c64b-194a-4659-b38f-a80ab80001b5',
    title: 'The house among olive ',
    type: 'hotel',
    price: 194,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/5.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.364499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 3
  },
];

export const mockOfferInfo: OfferDetails = {
  id: 'dc776305-ca30-4960-9639-9862aa34705c',
  title: 'Tile House',
  type: 'house',
  price: 255,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  location: {
    latitude: 48.868610000000004,
    longitude: 2.342499,
    zoom: 16
  },
  isFavorite: true,
  isPremium: false,
  rating: 4.7,
  description: 'I am happy to welcome you to my apartment in the city center! Three words: location, cosy and chic!',
  bedrooms: 3,
  maxAdults: 2,
  goods: [
    'Washing machine',
    'Fridge',
    'Kitchen',
    'Washer',
    'Dishwasher'],
  host: {
    name: 'Angelina',
    avatarUrl: 'https://14.design.htmlacademy.pro/static/host/avatar-angelina.jpg',
    isPro: true,
    email: 'angelina@example.com',
    token: 'G9erytRgDFcfse4feaGfsDSdrO1li21=',
  },
  images: [
    'https://14.design.htmlacademy.pro/static/hotel/9.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/2.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/8.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/4.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/3.jpg'],
};


export const mockNearbyOffers: Offers = [
  {
    id: '16b51ffa-faa6-40ac-84be-dd3accf59a58',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'hotel',
    price: 444,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/11.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.87961000000001,
      longitude: 2.353499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 1.3
  },
  {
    id: '1f90c64b-194a-4659-b38f-a80ab80001b5',
    title: 'The house among olive ',
    type: 'hotel',
    price: 194,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/5.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.364499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 3
  },
];

export const mockReviews: Reviews = [
  {
    id: '68d68b65-b236-40c5-b408-99d344fd6b01',
    date: '2024-12-12',
    user: {
      name: 'Jane',
      avatarUrl: 'avatar2.jpg',
      isPro: false,
      email: 'jane@example.com',
      token: 'Z3drmeEpSNmcse3kseRglADpcE3pj13=',
    },
    comment: 'Nice hotel',
    rating: 5,
  },
];

export const mockNewReview: Review = {
  id: '25590b52-59e2-41c2-9c4d-1035eaca2030',
  date: '2024-12-15',
  user: {
    name: 'Mark',
    avatarUrl: 'avatar3.jpg',
    isPro: false,
    email: 'mark@example.com',
    token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
  },
  comment: 'Amazing hotel woow',
  rating: 5,
};
