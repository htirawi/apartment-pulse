'use client';
import { useState, useEffect } from 'react';
import Message from '@/components/Message';
import MessageSkeleton from '@/components/skeletons/MessageSkeleton';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch('/api/messages');

        if (res.status === 200) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.error(error);
        console.log('Error fetching messages');
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, []);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 && !loading ? (
              <div className="text-lg text-gray-600">No messages found</div>
            ) : loading ? (
              Array.from({ length: 3 }).map((_, index: number) => (
                <MessageSkeleton key={index} />
              ))
            ) : (
              messages.map((message: any) => (
                <Message key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
