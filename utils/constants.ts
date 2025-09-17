// API endpoints
export const API_ENDPOINTS = {
  APARTMENTS: '/api/apartments',
  APARTMENT_BY_ID: (id: string) => `/api/apartments/${id}`,
  APARTMENT_BY_USER: (userId: string) => `/api/apartments/user/${userId}`,
  APARTMENT_SEARCH: '/api/apartments/search',
  FEATURED_APARTMENTS: '/api/apartments/featured',
  MESSAGES: '/api/messages',
  MESSAGE_BY_ID: (id: string) => `/api/messages/${id}`,
  UNREAD_COUNT: '/api/messages/unread-count',
  BOOKMARKS: '/api/bookmarks',
  BOOKMARK_CHECK: '/api/bookmarks/check',
} as const;

// Apartment types
export const APARTMENT_TYPES = [
  'Apartment',
  'Condo',
  'House',
  'Studio',
  'Other',
] as const;

// US States
export const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
] as const;

// Common amenities
export const COMMON_AMENITIES = [
  'Wifi',
  'Full kitchen',
  'Washer & Dryer',
  'Free Parking',
  'Swimming Pool',
  'Hot Tub',
  'Balcony/Patio',
  'Smart TV',
  'Air Conditioning',
  'Heating',
  'Coffee Maker',
  'Dishwasher',
  'Gym/Fitness Center',
  'Pet Friendly',
  'Elevator',
  'Fireplace',
  'Garden',
] as const;

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 6,
  MAX_PAGE_SIZE: 100,
} as const;

// Image upload limits
export const IMAGE_UPLOAD_LIMITS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILES: 10,
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
} as const;

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You must be logged in to perform this action.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
} as const;
