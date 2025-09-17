'use client';

import { motion } from 'framer-motion';
import FeaturedApartmentCard from './FeaturedApartmentCard';
import { IApartment } from '@/types/apartment';

interface IAnimatedFeaturedApartmentsProps {
  apartments: IApartment[];
}

const AnimatedFeaturedApartments = ({ apartments }: IAnimatedFeaturedApartmentsProps) => {
  if (apartments.length === 0) return null;

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

export default AnimatedFeaturedApartments;
