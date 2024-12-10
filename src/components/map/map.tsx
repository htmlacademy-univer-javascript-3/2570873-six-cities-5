import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '@const';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { City } from '../../app/types/city';
import { Offer, Offers } from '../../app/types/offer';
import useMap from '../../hooks/use-map';

type MapProps = {
  city: City;
  offers: Offers;
  selectedOffer: Offer | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map(props: MapProps): JSX.Element {
  const { city, offers, selectedOffer } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      // Центрируем карту на текущем городе
      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        }).setIcon(
          selectedOffer !== undefined && offer.id === selectedOffer.id
            ? currentCustomIcon
            : defaultCustomIcon
        );
        marker.addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, city, offers, selectedOffer]);

  return (
    <div
      className="cities__map map"
      style={{ height: '500px' }}
      ref={mapRef}
      // eslint-disable-next-line react/jsx-closing-tag-location
    ></div>
  );
}

export default Map;
