import { IApartment } from '@/types/apartment';

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

interface FetchApartmentsOptions {
  showFeatured?: boolean;
}

// Fetch apartments from the API
async function fetchApartments({ showFeatured = false }: FetchApartmentsOptions = {}): Promise<IApartment[]> {
  // handle if domain is not available
  if (!apiDomain) {
    return [];
  }
  const response = await fetch(
    `${apiDomain}/apartments${showFeatured ? '/featured' : ''}`,
    { cache: 'no-store' }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch apartments');
  }
  return response.json();
}

// Fetch a single apartment from the API
async function fetchApartment(id: string): Promise<IApartment | null> {
  try {
    // handle if domain is not available
    if (!apiDomain) {
      return null;
    }
    const response = await fetch(`${apiDomain}/apartments/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch apartment');
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { fetchApartments, fetchApartment };
