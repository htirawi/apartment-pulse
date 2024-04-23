import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getUserSession } from '@/utils/getUserSession';

export const dynamic = 'force-dynamic';

// GET /api/messages

export const GET = async (req) => {
  try {
    await connectDB();
    const userSession = await getUserSession();

    if (!userSession || !userSession.user) {
      return new Response(
        JSON.stringify('User ID is required to fetch messages'),
        { status: 401 }
      );
    }

    const { userId } = userSession;

    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 })
      .populate('sender', 'username')
      .populate('apartment', 'name');

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate('sender', 'username')
      .populate('apartment', 'name');

    const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify(messages), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

// POST /api/messages

export const POST = async (req) => {
  try {
    await connectDB();
    const { name, email, phone, message, apartment, recipient } =
      await req.json();

    const userSession = await getUserSession();

    if (!userSession || !userSession.user) {
      return new Response(
        JSON.stringify({ message: 'You must be logged in to send a message' }),
        { status: 401 }
      );
    }

    const { user } = userSession;

    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: "You can't send a message to yourself" }),
        {
          status: 400,
        }
      );
    }

    const newMessage = new Message({
      name,
      sender: user.id,
      email,
      phone,
      body: message,
      apartment,
      recipient,
    });

    await newMessage.save();

    return new Response(
      JSON.stringify({ message: 'Message Sent Successfully' }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
