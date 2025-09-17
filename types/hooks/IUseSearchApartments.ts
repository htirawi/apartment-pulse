import { IApartment } from '../apartment';

export interface ISearchParams {
  location?: string;
  apartmentType?: string;
}

export interface IUseSearchApartmentsReturn {
  apartments: IApartment[];
  loading: boolean;
  error: string | null;
  searchApartments: (params: ISearchParams) => void;
}
