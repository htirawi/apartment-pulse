'use client';

import { useState, useEffect } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';
import { toast } from 'react-toastify';

import { IMessageProps } from '@/types/components/IMessage';

const Message = ({ message }: IMessageProps) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { unreadCount, setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    try {
      const response = await fetch(`/api/messages/${message._id}`, {
        method: 'PUT',
      });

      if (response.status === 200) {
        const data = await response.json();
        setIsRead(data.read);
        const newCount = data.read ? unreadCount - 1 : unreadCount + 1;
        setUnreadCount(newCount);
        if (data.read) {
          toast.success('Message marked as read');
        } else {
          toast.success('Message marked as unread');
        }
      }

      if (response.status === 401) {
        throw new Error('Something went wrong');
      }

      setIsRead(!isRead);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`/api/messages/${message._id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        setIsDeleted(true);
        const newCount = isRead ? unreadCount : unreadCount - 1;
        setUnreadCount(newCount);
        toast.success('Message deleted');
      }

      if (response.status === 401) {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Apartment Inquiry:</span>
        {message.apartment.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.name}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {' '}
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {' '}
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{' '}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3 ${
          isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'
        } py-1 px-3 rounded-md`}
      >
        {isRead ? 'Mark as Unread' : 'Mark as Read'}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default Message;
