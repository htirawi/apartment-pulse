'use client';

import { useEffect, useState, useMemo } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';
import { setDefaults, fromAddress } from 'react-geocode';
import Spinner from '@/components/Spinner';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';
import { getMapboxTokenStatus } from '@/utils/mapboxUtils';
import SimpleMapFallback from './SimpleMapFallback';
import { IApartmentMapProps } from '@/types/components/IApartmentMap';

const ApartmentMap = ({ apartment }: IApartmentMapProps) => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 15,
    width: '100%',
    height: '500px',
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);
  const [mapboxError, setMapboxError] = useState(false);

  // Memoize Mapbox token status to prevent infinite loops
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const tokenStatus = useMemo(() => getMapboxTokenStatus(), []);

  // Initialize geocoding settings only once
  useEffect(() => {
    setDefaults({
      key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY, // API key for Geocoding
      language: 'en', // Default language for responses.
      region: 'us', // Default region for responses.
      outputFormat: 'json' as any, // Add required outputFormat
    });
  }, []);

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
    // Removed viewport from dependencies to prevent infinite loops
  ]);

  // Handle different states
  if (!tokenStatus.isValid) {
    return <SimpleMapFallback apartment={apartment} />;
  }

  if (loading) return <Spinner loading={loading} />;

  if (geocodeError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="text-red-800 font-medium">Location Error</h3>
            <p className="text-red-700 text-sm">No location data found for this address</p>
          </div>
        </div>
      </div>
    );
  }

  return !loading ? (
    <div className="relative">
      <Map
        mapboxAccessToken={mapboxToken}
        mapLib={import('mapbox-gl')}
        initialViewState={{
          latitude: lat || 0,
          longitude: lng || 0,
          zoom: 15,
        }}
        style={{ width: '100%', height: 500 }}
        mapStyle={'mapbox://styles/mapbox/streets-v9'}
        onError={(error) => {
          console.error('Mapbox error:', error);
          if (!mapboxError) {
            setMapboxError(true);
          }
        }}
      >
        <Marker latitude={lat || 0} longitude={lng || 0} anchor="bottom">
          <Image src={pin} alt="Pin" width={30} height={30} />
        </Marker>
      </Map>
      
      {mapboxError && (
        <div className="absolute inset-0 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-8 h-8 text-red-600 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <h3 className="text-red-800 font-medium">Map Error</h3>
            <p className="text-red-700 text-sm">
              Invalid Mapbox token. Please check your access token and permissions.
            </p>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default ApartmentMap;
