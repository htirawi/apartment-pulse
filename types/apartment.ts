export interface ILocation {
  street: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface IRates {
  nightly?: number;
  weekly?: number;
  monthly?: number;
}

export interface ISellerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface IApartment {
  _id: string;
  owner: string;
  name: string;
  type: string;
  description: string;
  location: ILocation;
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: IRates;
  seller_info: ISellerInfo;
  images: string[];
  is_featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IApartmentFormData {
  type: string;
  name: string;
  description: string;
  location: ILocation;
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: IRates;
  seller_info: ISellerInfo;
  images: FileList | null;
}