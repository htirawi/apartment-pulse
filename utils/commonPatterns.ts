// Common UI patterns and utilities to reduce code duplication

export const commonClassNames = {
  // Layout
  container: 'container-xl lg:container m-auto px-4 py-6',
  section: 'px-4 py-6',
  
  // Grid layouts
  apartmentGrid: 'grid grid-cols-1 md:grid-cols-3 gap-6',
  profileGrid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  
  // Buttons
  primaryButton: 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors',
  secondaryButton: 'bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors',
  dangerButton: 'bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors',
  
  // Text styles
  pageTitle: 'text-3xl font-bold mb-6 text-center',
  sectionTitle: 'text-xl font-semibold mb-4',
  errorText: 'text-red-600 text-center',
  emptyStateText: 'text-center text-gray-600',
  
  // Cards and containers
  card: 'bg-white px-6 py-8 mb-4 shadow-md rounded-md border',
  centerContainer: 'text-center',
};

// Common error handling
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Common loading states
export const createLoadingState = (message: string = 'Loading...') => ({
  loading: true,
  error: null,
  message,
});

export const createErrorState = (error: string) => ({
  loading: false,
  error,
});

export const createSuccessState = () => ({
  loading: false,
  error: null,
});

// Common validation helpers
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\d{10,}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Common formatting helpers
export const formatPrice = (price: number): string => {
  return price.toLocaleString();
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString();
};
