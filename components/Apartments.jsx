'use client';
import { useState, useEffect } from 'react';

import ApartmentCard from '@/components/ApartmentCard';
import Spinner from '@/components/Spinner';
import Pagination from '@/components/Pagination';

const Apartments = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch(
          `/api/apartments?page=${page}&pageSize=${pageSize}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch apartments');
        }
        const data = await response.json();
        setApartments(data.apartments);
        setTotalItems(data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {apartments.length === 0 ? (
          <p>No apartments found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {apartments.map((apartment) => (
              <ApartmentCard key={apartment._id} apartment={apartment} />
            ))}
          </div>
        )}
        <Pagination
          page={page}
          pageSize={pageSize}
          totalPages={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default Apartments;
