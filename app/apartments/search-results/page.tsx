'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowCircleLeft } from 'react-icons/fa';
import ApartmentCard from '@/components/ApartmentCard';
import ApartmentListSkeleton from '@/components/skeletons/ApartmentListSkeleton';
import ApartmentSearchForm from '@/components/ApartmentSearchForm';
import { useSearchApartments } from '@/hooks/useSearchApartments';
import { commonClassNames } from '@/utils/commonPatterns';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const { apartments, loading, error, searchApartments } = useSearchApartments();

  const location = searchParams.get('location');
  const apartmentType = searchParams.get('apartmentType');

  useEffect(() => {
    searchApartments({ 
      location: location || undefined, 
      apartmentType: apartmentType || undefined 
    });
  }, [location, apartmentType, searchApartments]);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start">
          <Link
            href="/apartments"
            className="flex items-center text-white text-mb-3 hover:underline"
          >
            <FaArrowCircleLeft className="mr-2 mb-1" /> Back To Apartments
          </Link>
        </div>
      </section>

      <ApartmentSearchForm />

      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href="/apartments"
            className="flex items-center text-blue-500 text-sm mb-3 hover:underline"
          >
            <FaArrowCircleLeft className="mr-2 mb-1" /> Back To Apartments
          </Link>
          <h1 className={commonClassNames.pageTitle}>Search Results</h1>
          
          {loading ? (
            <ApartmentListSkeleton count={6} />
          ) : error ? (
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => searchApartments({ 
                  location: location || undefined, 
                  apartmentType: apartmentType || undefined 
                })}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Try Again
              </button>
            </div>
          ) : apartments.length === 0 ? (
            <p className="text-center text-gray-600">No apartments found matching your search criteria.</p>
          ) : (
            <div className={commonClassNames.apartmentGrid}>
              {apartments.map((apartment) => (
                <ApartmentCard key={apartment._id} apartment={apartment} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
