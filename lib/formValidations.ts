import * as Yup from 'yup';

// Professional Yup validation schema for apartment form
export const apartmentFormSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf(['Apartment', 'Condo', 'House', 'Studio', 'Other'], 'Please select a valid apartment type')
    .required('Apartment type is required'),
    
  name: Yup.string()
    .min(1, 'Apartment name is required')
    .max(100, 'Name must be less than 100 characters')
    .required('Apartment name is required'),
    
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters')
    .required('Description is required'),
    
  location: Yup.object().shape({
    street: Yup.string()
      .min(1, 'Street address is required')
      .required('Street address is required'),
    city: Yup.string()
      .min(1, 'City is required')
      .required('City is required'),
    state: Yup.string()
      .length(2, 'Please select a valid state')
      .required('State is required'),
    zipcode: Yup.string()
      .min(5, 'Zipcode must be at least 5 characters')
      .max(10, 'Zipcode must be less than 10 characters')
      .matches(/^\d{5}(-\d{4})?$/, 'Please enter a valid zipcode (e.g., 12345 or 12345-6789)')
      .required('Zipcode is required'),
  }),
  
  beds: Yup.number()
    .typeError('Number of beds is required')
    .min(0, 'Beds cannot be negative')
    .max(20, 'Maximum 20 beds allowed')
    .integer('Beds must be a whole number')
    .required('Number of beds is required'),
    
  baths: Yup.number()
    .typeError('Number of baths is required')
    .min(0, 'Baths cannot be negative')
    .max(20, 'Maximum 20 baths allowed')
    .required('Number of baths is required'),
    
  square_feet: Yup.number()
    .typeError('Square feet is required')
    .min(100, 'Square feet must be at least 100')
    .max(10000, 'Square feet cannot exceed 10,000')
    .integer('Square feet must be a whole number')
    .required('Square feet is required'),
    
  amenities: Yup.array()
    .of(Yup.string())
    .max(20, 'Maximum 20 amenities allowed'),
    
  rates: Yup.object().shape({
    nightly: Yup.number()
      .min(0, 'Nightly rate cannot be negative')
      .nullable()
      .transform((value, originalValue) => {
        return originalValue === '' ? null : value;
      }),
    weekly: Yup.number()
      .min(0, 'Weekly rate cannot be negative')
      .nullable()
      .transform((value, originalValue) => {
        return originalValue === '' ? null : value;
      }),
    monthly: Yup.number()
      .min(0, 'Monthly rate cannot be negative')
      .nullable()
      .transform((value, originalValue) => {
        return originalValue === '' ? null : value;
      }),
  }).test(
    'at-least-one-rate',
    'At least one rate (nightly, weekly, or monthly) is required',
    function(value) {
      return !!(value.nightly || value.weekly || value.monthly);
    }
  ),
  
  seller_info: Yup.object().shape({
    name: Yup.string()
      .min(1, 'Seller name is required')
      .max(50, 'Name must be less than 50 characters')
      .required('Seller name is required'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Seller email is required'),
    phone: Yup.string()
      .min(10, 'Phone number must be at least 10 digits')
      .matches(/^[\d\s\-\(\)\+]+$/, 'Please enter a valid phone number')
      .required('Seller phone is required'),
  }),
});

// Initial form values
export const initialApartmentValues = {
  type: '',
  name: '',
  description: '',
  location: {
    street: '',
    city: '',
    state: '',
    zipcode: '',
  },
  beds: '',
  baths: '',
  square_feet: '',
  amenities: [] as string[],
  rates: {
    nightly: '',
    weekly: '',
    monthly: '',
  },
  seller_info: {
    name: '',
    email: '',
    phone: '',
  },
};
