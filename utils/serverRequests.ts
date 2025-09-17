// Server-side utilities for direct database access (used in server components)
import connectDB from '@/config/database';
import Apartment from '@/models/Apartment';
import { IApartment } from '@/types/apartment';

interface FetchApartmentsOptions {
  showFeatured?: boolean;
  limit?: number;
}

// Fetch apartments directly from database (server-side only)
export async function fetchApartmentsFromDB({ 
  showFeatured = false, 
  limit 
}: FetchApartmentsOptions = {}): Promise<IApartment[]> {
  try {
    await connectDB();
    
    const query = showFeatured ? { is_featured: true } : {};
    let apartmentQuery = Apartment.find(query).lean();
    
    if (limit) {
      apartmentQuery = apartmentQuery.limit(limit);
    }
    
    const apartments = await apartmentQuery;
    
    // Ensure we return a valid array
    if (!apartments || !Array.isArray(apartments)) {
      console.warn('No apartments found in database');
      return [];
    }
    
    return apartments as IApartment[];
  } catch (error) {
    console.error('Error fetching apartments from database:', error);
    // Return empty array on error to prevent crashes
    return [];
  }
}

// Fetch a single apartment directly from database (server-side only)
export async function fetchApartmentFromDB(id: string): Promise<IApartment | null> {
  try {
    await connectDB();
    const apartment = await Apartment.findById(id).lean();
    return apartment as IApartment;
  } catch (error) {
    console.error('Error fetching apartment from database:', error);
    return null;
  }
}
