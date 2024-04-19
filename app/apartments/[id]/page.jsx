'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchApartment } from '@/utils/requests';
import Link from 'next/link';

import ApartmentHeaderImage from '@/components/ApartmentHeaderImage';
import ApartmentDetails from '@/components/ApartmentDetails';
import Spinner from '@/components/Spinner';

import { FaArrowLeft } from 'react-icons/fa';

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
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch apartment', error);
        setLoading(false);
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
          <ApartmentHeaderImage image={apartment.images[0]} />
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
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                    <i className="fas fa-bookmark mr-2"></i> Bookmark Apartment
                  </button>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                    <i className="fas fa-share mr-2"></i> Share Apartment
                  </button>

                  {/* <!-- Contact Form --> */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-6">
                      Contact Apartment Manager
                    </h3>
                    <form>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Name:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="email"
                        >
                          Email:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="phone"
                        >
                          Phone:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="phone"
                          type="text"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="message"
                        >
                          Message:
                        </label>
                        <textarea
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                          id="message"
                          placeholder="Enter your message"
                        ></textarea>
                      </div>
                      <div>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                          type="submit"
                        >
                          <i className="fas fa-paper-plane mr-2"></i> Send
                          Message
                        </button>
                      </div>
                    </form>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ApartmentPage;
