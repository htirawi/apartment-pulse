'use client';

import { useEffect, useState } from 'react';
import ApartmentCard from '@/components/ApartmentCard';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

const SavedApartmentsPage = () => {
  const [savedApartments, setSavedApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedApartments = async () => {
      try {
        const response = await fetch('/api/bookmarks');
        if (response.status !== 200) {
          throw new Error('Failed to fetch saved apartments');
        }
        const data = await response.json();
        setSavedApartments(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch saved apartments', error);
        toast.error('Failed to fetch saved apartments');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedApartments();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <h1 className="text-xl mb-4">Saved Apartments</h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {savedApartments.length === 0 ? (
          <p>No bookmarks found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedApartments.map((apartment) => (
              <ApartmentCard key={apartment._id} apartment={apartment} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedApartmentsPage;
