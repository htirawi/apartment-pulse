import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { IApartment } from '@/types/apartment';
import { toast } from 'react-toastify';

interface UseSavedApartmentsReturn {
  savedApartments: IApartment[];
  loading: boolean;
  error: string | null;
  refreshSavedApartments: () => void;
}

export const useSavedApartments = (): UseSavedApartmentsReturn => {
  const { data: session } = useSession();
  const [savedApartments, setSavedApartments] = useState<IApartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSavedApartments = useCallback(async () => {
    if (!session) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/bookmarks');
      
      if (response.ok) {
        const data = await response.json();
        setSavedApartments(data);
      } else {
        throw new Error('Failed to fetch saved apartments');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch saved apartments';
      setError(errorMessage);
      console.error('Error fetching saved apartments:', err);
    } finally {
      setLoading(false);
    }
  }, [session]);

  const refreshSavedApartments = useCallback(() => {
    fetchSavedApartments();
  }, [fetchSavedApartments]);

  useEffect(() => {
    fetchSavedApartments();
  }, [fetchSavedApartments]);

  return {
    savedApartments,
    loading,
    error,
    refreshSavedApartments,
  };
};
