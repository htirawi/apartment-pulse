'use client';

import { motion } from 'framer-motion';
import ApartmentCard from '@/components/ApartmentCard';
import ApartmentListSkeleton from '@/components/skeletons/ApartmentListSkeleton';
import Pagination from '@/components/Pagination';
import { useApartments } from '@/hooks/useApartments';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Apartments = () => {
  const { apartments, pagination, loading, error, fetchApartments } = useApartments(1, 5);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handlePageChange = (newPage: number) => {
    fetchApartments(newPage);
  };

  if (loading) {
    return <ApartmentListSkeleton count={5} />;
  }

  if (error) {
    return (
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => fetchApartments()}
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
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {apartments.length === 0 ? (
          <p className="text-center text-gray-600">No apartments found</p>
        ) : (
          <>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
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
            
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  page={pagination.currentPage}
                  pageSize={pagination.pageSize}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Apartments;
