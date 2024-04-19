import connectDB from '@/config/database';
import Apartment from '@/models/Apartment';

// GET /api/apartments
export const GET = async (req) => {
  try {
    await connectDB();

    const apartments = await Apartment.find({});
    debugger;

    return new Response(JSON.stringify(apartments), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
