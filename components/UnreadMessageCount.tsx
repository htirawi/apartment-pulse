'use client';

import { useState, useEffect } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';
import { IUnreadMessageCountProps } from '@/types/components/IUnreadMessageCount';

const UnreadMessageCount = ({ session }: IUnreadMessageCountProps) => {
  const { unreadCount, setUnreadCount } = useGlobalContext();

  useEffect(() => {
    if (!session) return;

    const fetchUnreadMessages = async () => {
      try {
        const response = await fetch('/api/messages/unread-count');

        if (response.status === 200) {
          const { count } = await response.json();
          setUnreadCount(count);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUnreadMessages();
  }, [session, setUnreadCount]);

  return unreadCount > 0 ? (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {unreadCount}
    </span>
  ) : null;
};

export default UnreadMessageCount;
