import { IApartment } from '../apartment';

export interface IUseUserApartmentsReturn {
  apartments: IApartment[];
  loading: boolean;
  error: string | null;
  deleteApartment: (apartmentId: string) => Promise<void>;
}
