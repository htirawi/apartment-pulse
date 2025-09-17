import { useState, useEffect, useCallback } from 'react';
import { IApartment } from '@/types/apartment';
import { ISearchParams, IUseSearchApartmentsReturn } from '@/types/hooks/IUseSearchApartments';

export const useSearchApartments = (): IUseSearchApartmentsReturn => {
  const [apartments, setApartments] = useState<IApartment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchApartments = useCallback(async ({ location, apartmentType }: ISearchParams) => {
    setLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams();
      if (location) searchParams.append('location', location);
      if (apartmentType) searchParams.append('apartmentType', apartmentType);

      const response = await fetch(`/api/apartments/search?${searchParams.toString()}`);
      
      if (response.ok) {
        const data = await response.json();
        setApartments(data);
      } else {
        throw new Error('Failed to search apartments');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed';
      setError(errorMessage);
      console.error('Error searching apartments:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    apartments,
    loading,
    error,
    searchApartments,
  };
};
