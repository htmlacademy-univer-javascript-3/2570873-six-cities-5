import PlaceCard from '@components/place-card/place-card';
import { CardType } from '@const';
import { memo, useCallback, useEffect, useState } from 'react';
import { Offer } from 'types/offer';

type OffersListProps = {
  offers: Offer[];
  onActiveOfferChange: (offerId: string | number | null) => void;
};

function OffersList({ offers, onActiveOfferChange }: OffersListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | number | null>(null);

  useEffect(() => {
    onActiveOfferChange(activeOfferId);
  }, [activeOfferId, onActiveOfferChange]);

  const handleMouseEnter = useCallback((offerId: string | number) => {
    setActiveOfferId(offerId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveOfferId(null);
  }, []);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
          cardType={CardType.Regular}
        />
      ))}
    </div>
  );
}

const MemoizedOffersList = memo(OffersList);
export default MemoizedOffersList;
