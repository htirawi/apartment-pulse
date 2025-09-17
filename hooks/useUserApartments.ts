import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { IApartment } from '@/types/apartment';
import { toast } from 'react-toastify';

interface UseUserApartmentsReturn {
  apartments: IApartment[];
  loading: boolean;
  error: string | null;
  refreshApartments: () => void;
  deleteApartment: (apartmentId: string) => Promise<void>;
}

export const useUserApartments = (): UseUserApartmentsReturn => {
  const { data: session } = useSession();
  const [apartments, setApartments] = useState<IApartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserApartments = useCallback(async () => {
    const userId = (session?.user as any)?.id;
    
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/apartments/user/${userId}`);
      
      if (response.ok) {
        const data = await response.json();
        setApartments(data);
      } else {
        throw new Error('Failed to fetch user apartments');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch apartments';
      setError(errorMessage);
      console.error('Error fetching user apartments:', err);
    } finally {
      setLoading(false);
    }
  }, [session]);

  const deleteApartment = useCallback(async (apartmentId: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this apartment?'
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/apartments/${apartmentId}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        setApartments((prevApartments) =>
          prevApartments.filter((apartment) => apartment._id !== apartmentId)
        );
        toast.success('Apartment deleted successfully');
      } else {
        throw new Error('Failed to delete apartment');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete apartment';
      toast.error(errorMessage);
      console.error('Error deleting apartment:', err);
    }
  }, []);

  const refreshApartments = useCallback(() => {
    fetchUserApartments();
  }, [fetchUserApartments]);

  useEffect(() => {
    fetchUserApartments();
  }, [fetchUserApartments]);

  return {
    apartments,
    loading,
    error,
    refreshApartments,
    deleteApartment,
  };
};
