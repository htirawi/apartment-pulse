'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowCircleLeft } from 'react-icons/fa';
import ApartmentCard from '@/components/ApartmentCard';
import Spinner from '@/components/Spinner';
import ApartmentSearchForm from '@/components/ApartmentSearchForm';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get('location');
  const apartmentType = searchParams.get('apartmentType');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `/api/apartments/search?location=${location}&apartmentType=${apartmentType}`
        );
        if (response.status === 200) {
          const data = await response.json();
          setApartments(data);
        } else {
          console.error('Failed to fetch search results');
          setApartments([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, apartmentType]);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col-items-start sm:px-6 lg:px-8">
          <ApartmentSearchForm />
        </div>
      </section>

      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <Link
              href="/apartments"
              className="flex items-center text-blue-500 hover:underline mb-3"
            >
              <FaArrowCircleLeft className="mr-2 mb-1" />
              Back to Apartments
            </Link>
            <h1 className="text-2xl mb-4">Search Results</h1>
            {apartments.length === 0 ? (
              <p>No Search Results Found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {apartments.map((apartment) => (
                  <ApartmentCard key={apartment._id} apartment={apartment} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SearchResultsPage;
