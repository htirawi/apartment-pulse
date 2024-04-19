import connectDB from '@/config/database';
import Apartment from '@/models/Apartment';

// GET /api/apartments/:id
export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const apartment = await Apartment.findById(params.id);
    if (!apartment) {
      return new Response('Apartment Not Found', { status: 404 });
    }
    return new Response(JSON.stringify(apartment), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
