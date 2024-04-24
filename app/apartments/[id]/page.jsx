'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchApartment } from '@/utils/requests';
import Link from 'next/link';

import ApartmentHeaderImage from '@/components/ApartmentHeaderImage';
import ApartmentImages from '@/components/ApartmentImages';
import ApartmentDetails from '@/components/ApartmentDetails';
import BookmarkButton from '@/components/BookmarkButton';
import ShareButtons from '@/components/ShareButtons';

import Spinner from '@/components/Spinner';

import { FaArrowLeft } from 'react-icons/fa';
import ApartmentContactForm from '@/components/ApartmentContactForm';

const ApartmentPage = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getApartment = async () => {
      if (!id) return;
      try {
        const data = await fetchApartment(id);
        setApartment(data);
      } catch (error) {
        console.error('Failed to fetch apartment', error);
      } finally {
        setLoading(false);
      }
    };
    if (apartment === null) {
      getApartment();
    }
  }, [id, apartment]);

  if (!apartment && !loading) {
    return (
      <h1 classNameName="text-center text-2xl font-bold mt-10">
        Apartment Not Found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && apartment && (
        <>
          <ApartmentHeaderImage image={apartment?.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/apartments"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Apartments
              </Link>
            </div>
          </section>
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <ApartmentDetails apartment={apartment} />

                <aside className="space-y-4">
                  <BookmarkButton apartment={apartment} />
                  <ShareButtons apartment={apartment} />
                  <ApartmentContactForm apartment={apartment} />
                </aside>
              </div>
            </div>
          </section>
          <ApartmentImages images={apartment.images} />
        </>
      )}
    </>
  );
};

export default ApartmentPage;
