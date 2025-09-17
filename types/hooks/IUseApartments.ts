import { IApartment } from '../apartment';

export interface IUseApartmentsReturn {
  apartments: IApartment[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  fetchApartments: (page?: number) => Promise<void>;
  refreshApartments: () => Promise<void>;
}
