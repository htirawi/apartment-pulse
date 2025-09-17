'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FeaturedApartmentCard from './FeaturedApartmentCard';
import { IApartment } from '@/types/apartment';

const ClientFeaturedApartments = () => {
  const [apartments, setApartments] = useState<IApartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedApartments = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/apartments/featured');
        
        if (!response.ok) {
          throw new Error('Failed to fetch featured apartments');
        }
        
        const result = await response.json();
        
        // Handle both response formats
        if (result.success && result.data) {
          setApartments(result.data);
        } else if (Array.isArray(result)) {
          setApartments(result);
        } else {
          setApartments([]);
        }
      } catch (err) {
        console.error('Error fetching featured apartments:', err);
        setError('Failed to load featured apartments');
        setApartments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedApartments();
  }, []);

  // Don't render anything if loading or no apartments
  if (loading || error || apartments.length === 0) {
    return null;
  }

  return (
    <section className="bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl lg:container m-auto">
        <motion.h2 
          className="text-3xl font-bold text-blue-500 mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Featured Apartments
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {apartments.map((apartment, index) => (
            <motion.div
              key={apartment._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2,
                ease: "easeOut" 
              }}
              whileHover={{ scale: 1.02 }}
            >
              <FeaturedApartmentCard apartment={apartment} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientFeaturedApartments;
