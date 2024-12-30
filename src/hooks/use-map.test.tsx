import { render } from '@testing-library/react';
import { Map, TileLayer } from 'leaflet';
import { MutableRefObject } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useMap from './use-map';

vi.mock('leaflet', async () => {
  const actual = await vi.importActual<typeof import('leaflet')>('leaflet');
  return {
    ...actual,
    Map: vi.fn(() => ({
      addLayer: vi.fn(),
    })),
    TileLayer: vi.fn(),
  };
});

describe('Hook: useMap', () => {
  let mapRef: MutableRefObject<HTMLElement | null>;
  const city = {
    name: 'Amsterdam',
    location: {
      latitude: 52.374,
      longitude: 4.889,
      zoom: 12,
    },
  };

  beforeEach(() => {
    mapRef = { current: document.createElement('div') };
  });

  it('should initialize a Leaflet map instance', () => {
    const TestComponent = () => {
      const map = useMap(mapRef, city);
      return <div>{map ? 'Map Initialized' : 'Map Not Initialized'}</div>;
    };

    const { getByText } = render(<TestComponent />);

    expect(getByText('Map Initialized')).toBeInTheDocument();
    expect(Map).toHaveBeenCalledWith(mapRef.current, {
      center: { lat: city.location.latitude, lng: city.location.longitude },
      zoom: city.location.zoom,
    });
    expect(TileLayer).toHaveBeenCalledWith(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    );
  });
});
