// API-related type definitions

export interface IApiError {
  message: string;
  code?: string;
  details?: any;
}

export interface IPaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IApartmentsResponse {
  apartments: import('./apartment').IApartment[];
  pagination: IPaginationMeta;
}

// Form event types
export interface IFormChangeEvent {
  target: {
    name: string;
    value: string;
    type: string;
  };
}

export interface IFormSubmitEvent {
  preventDefault: () => void;
  target: HTMLFormElement;
}

// Session user type (extended from NextAuth)
export interface ISessionUser {
  id: string;
  name?: string;
  email?: string;
  image?: string;
}

// Message types
export interface IMessage {
  _id: string;
  sender: string;
  recipient: string;
  apartment: {
    _id: string;
    name: string;
  };
  name: string;
  email: string;
  phone: string;
  body: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

// Search parameters
export interface ISearchParams {
  location?: string;
  apartmentType?: string;
  beds?: string;
  baths?: string;
  minPrice?: string;
  maxPrice?: string;
}
