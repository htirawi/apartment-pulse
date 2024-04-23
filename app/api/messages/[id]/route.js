import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getUserSession } from '@/utils/getUserSession';

export const dynamic = 'force-dynamic';

// PUT /api/messages/[id]

export const PUT = async (req, { params }) => {
  try {
    await connectDB();
    const { id } = params;
    const userSession = await getUserSession();

    if (!userSession || !userSession.user) {
      return new Response('User ID is required to fetch messages', {
        status: 401,
      });
    }

    const { userId } = userSession;

    const message = await Message.findById(id);

    if (!message) {
      return new Response(JSON.stringify('Message not found'), {
        status: 404,
      });
    }

    // Check if the user is the recipient of the message
    if (message.recipient.toString() !== userId) {
      return new Response('You are not authorized to update this message', {
        status: 401,
      });
    }

    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// DELETE /api/messages/[id]

export const DELETE = async (req, { params }) => {
  try {
    await connectDB();
    const { id } = params;
    const userSession = await getUserSession();

    if (!userSession || !userSession.user) {
      return new Response('User ID is required to fetch messages', {
        status: 401,
      });
    }

    const { userId } = userSession;

    const message = await Message.findById(id);

    if (!message) {
      return new Response(JSON.stringify('Message not found'), {
        status: 404,
      });
    }

    // Check if the user is the recipient of the message
    if (message.recipient.toString() !== userId) {
      return new Response('You are not authorized to update this message', {
        status: 401,
      });
    }

    await message.deleteOne();

    return new Response('Message Deleted', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
