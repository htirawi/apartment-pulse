import connectDB from '@/config/database';
import User from '@/models/User';
import { getUserSession } from '@/utils/getUserSession';

export const dynamic = 'force-dynamic';

export const POST = async (req, res) => {
  try {
    await connectDB();

    const { apartmentId } = await req.json();

    const sessionUser = await getUserSession(req);

    if (!sessionUser || !sessionUser.userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { userId } = sessionUser;

    // Find the user
    const user = await User.findById(userId);
    // const user = await User.findOne({ _id: userId});

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    // Check if apartment bookmarked
    let isBookmarked = user.bookmarks.includes(apartmentId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
