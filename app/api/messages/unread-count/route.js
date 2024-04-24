import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getUserSession } from '@/utils/getUserSession';

export const dynamic = 'force-dynamic';

// GET /api/messages/unread-count

export const GET = async () => {
  try {
    await connectDB();
    const userSession = await getUserSession();

    if (!userSession || !userSession.user) {
      return new Response('User ID is required to fetch messages', {
        status: 401,
      });
    }

    const { userId } = userSession;

    const unreadMessageCount = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return new Response(JSON.stringify({ count: unreadMessageCount }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
