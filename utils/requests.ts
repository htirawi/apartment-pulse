import { IApartment } from '@/types/apartment';

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

interface FetchApartmentsOptions {
  showFeatured?: boolean;
}

// Fetch apartments from the API
async function fetchApartments({ showFeatured = false }: FetchApartmentsOptions = {}): Promise<IApartment[]> {
  try {
    const url = showFeatured ? '/api/apartments/featured' : '/api/apartments';
    
    const response = await fetch(url, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch apartments');
    }
    
    const result = await response.json();
    
    // Handle both old and new API response formats
    if (result.success && result.data) {
      // New format: { success: true, data: { apartments: [...] } }
      return result.data.apartments || [];
    } else if (Array.isArray(result)) {
      // Old format: direct array
      return result;
    } else {
      // Handle other formats
      return result.apartments || [];
    }
  } catch (error) {
    console.error('Error fetching apartments:', error);
    return [];
  }
}

// Fetch a single apartment from the API
async function fetchApartment(id: string): Promise<IApartment | null> {
  try {
    const url = `/api/apartments/${id}`;
    
    console.log('Fetching apartment from:', url);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to fetch apartment: ${response.status}`);
    }

    const result = await response.json();
    
    // Handle both old and new API response formats
    if (result.success && result.data) {
      return result.data;
    } else if (result.success === false) {
      console.error('API returned error:', result.error);
      return null;
    } else {
      // Legacy format - direct apartment object
      return result;
    }
  } catch (error) {
    console.error('Error fetching apartment:', error);
    return null;
  }
}

export { fetchApartments, fetchApartment };
