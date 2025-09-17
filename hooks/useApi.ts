import { useState, useCallback } from 'react';
import { ApiResponse } from '@/utils/apiResponse';

import { IUseApiState, IUseApiReturn } from '@/types/hooks/IUseApi';

export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<Response>
): IUseApiReturn<T> {
  const [state, setState] = useState<IUseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiFunction(...args);
        const result: ApiResponse<T> = await response.json();

        if (result.success) {
          setState({
            data: result.data || null,
            loading: false,
            error: null,
          });
          return result.data || null;
        } else {
          setState({
            data: null,
            loading: false,
            error: result.error || 'An error occurred',
          });
          return null;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Network error';
        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });
        return null;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
