import { useState, useEffect, useCallback } from 'react';
import { IApartment } from '@/types/apartment';
import { ApiResponse } from '@/utils/apiResponse';

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ApartmentsData {
  apartments: IApartment[];
  pagination: PaginationInfo;
}

interface UseApartmentsReturn {
  apartments: IApartment[];
  pagination: PaginationInfo | null;
  loading: boolean;
  error: string | null;
  fetchApartments: (page?: number, pageSize?: number) => Promise<void>;
  refreshApartments: () => Promise<void>;
}

export const useApartments = (
  initialPage: number = 1,
  initialPageSize: number = 6
): UseApartmentsReturn => {
  const [apartments, setApartments] = useState<IApartment[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentPageSize, setCurrentPageSize] = useState(initialPageSize);

  const fetchApartments = useCallback(async (page?: number, pageSize?: number) => {
    const targetPage = page ?? currentPage;
    const targetPageSize = pageSize ?? currentPageSize;
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/apartments?page=${targetPage}&pageSize=${targetPageSize}`
      );

      const result: ApiResponse<ApartmentsData> = await response.json();

      if (result.success && result.data) {
        setApartments(result.data.apartments);
        setPagination(result.data.pagination);
        setCurrentPage(targetPage);
        setCurrentPageSize(targetPageSize);
      } else {
        throw new Error(result.error || 'Failed to fetch apartments');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch apartments';
      setError(errorMessage);
      console.error('Error fetching apartments:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, currentPageSize]);

  const refreshApartments = useCallback(() => {
    return fetchApartments(currentPage, currentPageSize);
  }, [fetchApartments, currentPage, currentPageSize]);

  useEffect(() => {
    fetchApartments();
  }, [fetchApartments]);

  return {
    apartments,
    pagination,
    loading,
    error,
    fetchApartments,
    refreshApartments,
  };
};
