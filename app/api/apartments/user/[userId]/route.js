import connectDB from '@/config/database';
import Apartment from '@/models/Apartment';

export const dynamic = 'force-dynamic';

// GET /api/apartments/user/:userId
export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const userId = params.userId;

    if (!userId) {
      return new Response('User Id is required', { status: 401 });
    }

    const apartments = await Apartment.find({ owner: userId });

    return new Response(JSON.stringify(apartments), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
