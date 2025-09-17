import { z } from 'zod';

// Environment variables validation
export const envSchema = z.object({
  MONGODB_URI: z.string().min(1, 'MongoDB URI is required'),
  NEXTAUTH_URL: z.string().url('Invalid NextAuth URL'),
  NEXTAUTH_SECRET: z.string().min(1, 'NextAuth secret is required'),
  GOOGLE_CLIENT_ID: z.string().min(1, 'Google Client ID is required'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'Google Client Secret is required'),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, 'Cloudinary cloud name is required'),
  CLOUDINARY_API_KEY: z.string().min(1, 'Cloudinary API key is required'),
  CLOUDINARY_API_SECRET: z.string().min(1, 'Cloudinary API secret is required'),
  NEXT_PUBLIC_MAPBOX_TOKEN: z.string().min(1, 'Mapbox token is required'),
  NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY: z.string().min(1, 'Google Geocoding API key is required'),
});

// Apartment validation schemas
export const locationSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required').max(2, 'State must be 2 characters'),
  zipcode: z.string().min(5, 'Zipcode must be at least 5 characters'),
});

export const ratesSchema = z.object({
  nightly: z.number().min(0).optional(),
  weekly: z.number().min(0).optional(),
  monthly: z.number().min(0).optional(),
}).refine(
  (data) => data.nightly || data.weekly || data.monthly,
  {
    message: 'At least one rate (nightly, weekly, or monthly) is required',
  }
);

export const sellerInfoSchema = z.object({
  name: z.string().min(1, 'Seller name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

export const apartmentSchema = z.object({
  type: z.enum(['Apartment', 'Condo', 'House', 'Studio', 'Other'], {
    message: 'Apartment type is required',
  }),
  name: z.string().min(1, 'Apartment name is required').max(100, 'Name too long'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description too long'),
  location: locationSchema,
  beds: z.number().min(0, 'Beds cannot be negative').max(20, 'Too many beds'),
  baths: z.number().min(0, 'Baths cannot be negative').max(20, 'Too many baths'),
  square_feet: z.number().min(100, 'Square feet must be at least 100').max(10000, 'Square feet too large'),
  amenities: z.array(z.string()).max(20, 'Too many amenities'),
  rates: ratesSchema,
  seller_info: sellerInfoSchema,
});

// Message validation schema
export const messageSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
  apartment: z.string().min(1, 'Apartment ID is required'),
  recipient: z.string().min(1, 'Recipient ID is required'),
});

// Search parameters validation
export const searchSchema = z.object({
  location: z.string().optional(),
  apartmentType: z.string().optional(),
  beds: z.string().optional(),
  baths: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
});

// Pagination validation
export const paginationSchema = z.object({
  page: z.string().optional().default('1').transform((val) => parseInt(val, 10)).pipe(z.number().min(1, 'Page must be at least 1')),
  pageSize: z.string().optional().default('10').transform((val) => parseInt(val, 10)).pipe(z.number().min(1, 'Page size must be at least 1').max(100, 'Page size too large')),
});

// Utility function to validate environment variables
export const validateEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('Environment validation failed:', error);
    throw new Error('Invalid environment configuration');
  }
};
