'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import { FaBookmark } from 'react-icons/fa';

import { IBookmarkButtonProps } from '@/types/components/IBookmarkButton';

const BookmarkButton = ({ apartment }: IBookmarkButtonProps) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const userId = session?.user ? (session.user as any).id : null;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const checkBookmarkStatus = async () => {
      try {
        const response = await fetch(`/api/bookmarks/check`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ apartmentId: apartment._id }),
        });

        if (response.status === 200) {
          const data = await response.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkBookmarkStatus();
  }, [apartment._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error('Please login to bookmark an apartment');
      return;
    }

    try {
      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apartmentId: apartment._id }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setIsBookmarked(data.isBookmarked);
        toast.success(data.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'An error occurred');
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Apartment
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Apartment
    </button>
  );
};

export default BookmarkButton;
