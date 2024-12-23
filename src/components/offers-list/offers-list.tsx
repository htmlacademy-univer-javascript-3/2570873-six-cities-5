import PlaceCard from '@components/place-card/place-card';
import { CardType } from '@const';
import { Offer } from 'app/types/offer';
import { OfferDetails } from 'app/types/offer-details';
import { memo, useCallback, useEffect, useState } from 'react';

type OffersListProps = {
  offers: Offer[];
  onActiveOfferChange: (offerId: string | number | null) => void;
};

function OffersList({
  offers,
  onActiveOfferChange,
}: OffersListProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Offer | OfferDetails | null>(
    null
  );

  useEffect(() => {
    onActiveOfferChange(activeOffer ? activeOffer.id : null);
  }, [activeOffer, onActiveOfferChange]);

  const handleMouseEnter = useCallback((offer: Offer | OfferDetails) => {
    setActiveOffer(offer);
  }, []);

  const handleMouseLeave = () => {
    setActiveOffer(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => handleMouseEnter(offer)}
          onMouseLeave={handleMouseLeave}
          cardType={CardType.Regular}
        />
      ))}
    </div>
  );
}

const MemoizedOffersList = memo(OffersList);
export default MemoizedOffersList;
