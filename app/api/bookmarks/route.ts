import connectDB from '@/config/database';
import Apartment from '@/models/Apartment';
import User from '@/models/User';
import { getUserSession } from '@/utils/getUserSession';

export const dynamic = 'force-dynamic';

export const GET = async (req: Request) => {
  try {
    await connectDB();
    const sessionUser = await getUserSession();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { userId } = sessionUser;

    // Find the user
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    // Get user bookmarks
    const bookmarks = await Apartment.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response('Something went wrong...', { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    await connectDB();

    const { apartmentId } = await request.json();

    const sessionUser = await getUserSession();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { userId } = sessionUser;

    // Find the user
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    // Check if apartment bookmarked
    let isBookmarked = user.bookmarks.includes(apartmentId);

    let message;

    if (isBookmarked) {
      // Remove bookmark
      user.bookmarks.pull(apartmentId);
      message = 'Bookmark removed';
      isBookmarked = false;
    } else {
      // Add bookmark
      user.bookmarks.push(apartmentId);
      message = 'Bookmark added';
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response('Something went wrong...', { status: 500 });
  }
};
