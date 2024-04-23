import connectDB from '@/config/database';
import Apartment from '@/models/Apartment';

export const dynamic = 'force-dynamic';

// GET /api/apartments/featured
export const GET = async (req) => {
  try {
    await connectDB();

    const apartments = await Apartment.find({ is_featured: true });

    return new Response(JSON.stringify(apartments), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
