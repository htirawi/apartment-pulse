'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ApartmentCard from '@/components/ApartmentCard';
import ApartmentListSkeleton from '@/components/skeletons/ApartmentListSkeleton';
import { IApartment } from '@/types/apartment';

const ClientHomeApartments = () => {
  const [apartments, setApartments] = useState<IApartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentApartments = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/apartments?pageSize=6');
        
        if (!response.ok) {
          throw new Error('Failed to fetch apartments');
        }
        
        const result = await response.json();
        
        if (result.success && result.data?.apartments) {
          const recentApartments = result.data.apartments
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
          setApartments(recentApartments);
        } else {
          setApartments([]);
        }
      } catch (err) {
        console.error('Error fetching recent apartments:', err);
        setError('Failed to load recent apartments');
        setApartments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentApartments();
  }, []);

  if (loading) {
    return (
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Apartments
          </h2>
          <ApartmentListSkeleton count={3} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Apartments
          </h2>
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <motion.h2 
            className="text-3xl font-bold text-blue-500 mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Recent Apartments
          </motion.h2>
          
          {apartments.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-600 mb-4">No apartments available at the moment</p>
              <Link
                href="/apartments/add"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg inline-block"
              >
                Add First Apartment
              </Link>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {apartments.map((apartment, index) => (
                <motion.div
                  key={apartment._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut" 
                  }}
                >
                  <ApartmentCard apartment={apartment} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section className="m-auto max-w-lg my-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/apartments"
            className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700 transition-colors"
          >
            View All Apartments
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default ClientHomeApartments;
