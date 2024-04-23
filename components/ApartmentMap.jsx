'use client';

import { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';
import { setDefaults, fromAddress } from 'react-geocode';
import Spinner from '@/components/Spinner';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';

const ApartmentMap = ({ apartment }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 15,
    width: '100%',
    height: '500px',
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY, // API key for Mapbox.
    language: 'en', // Default language for responses.
    region: 'us', // Default region for responses.
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const address = `${apartment.location.street},
            ${apartment.location.city},
            ${apartment.location.state},
            ${apartment.location.zipcode}`;

        const response = await fromAddress(address);

        // check if response is valid
        if (response.results.length === 0) {
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setGeocodeError(true);
        setLoading(false);
      }
    };
    fetchCoords();
  }, [
    apartment.location.city,
    apartment.location.state,
    apartment.location.street,
    apartment.location.zipcode,
    viewport,
  ]);

  if (loading) return <Spinner loading={loading} />;

  if (geocodeError) {
    return (
      <div className="alert alert-danger" role="alert">
        <p>No location data found</p>
      </div>
    );
  }

  return !loading ? (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapLib={import('mapbox-gl')}
      initialViewState={{
        latitude: lat,
        longitude: lng,
        zoom: 15,
      }}
      style={{ width: '100%', height: 500 }}
      mapStyle={'mapbox://styles/mapbox/streets-v9'}
    >
      <Marker latitude={lat} longitude={lng} anchor="bottom">
        <Image src={pin} alt="Pin" width={30} height={30} />
      </Marker>
    </Map>
  ) : null;
};

export default ApartmentMap;
