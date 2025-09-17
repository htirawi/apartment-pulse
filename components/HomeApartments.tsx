import Link from 'next/link';

import ApartmentCard from '@/components/ApartmentCard';
import { fetchApartmentsFromDB } from '@/utils/serverRequests';

const HomeApartments = async () => {
  try {
    const apartments = await fetchApartmentsFromDB({ limit: 6 });

    // Get 3 recent apartments (randomly selected)
    const recentApartments = Array.isArray(apartments) && apartments.length > 0
      ? apartments
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
      : [];

    console.log('HomeApartments: Found', apartments.length, 'apartments, showing', recentApartments.length);

    return (
      <>
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto">
            <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
              Recent Apartments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentApartments.length === 0 ? (
                <p>No apartments found</p>
              ) : (
                recentApartments.map((apartment: any) => (
                  <ApartmentCard key={apartment._id} apartment={apartment} />
                ))
              )}
            </div>
          </div>
        </section>

        <section className="m-auto max-w-lg my-10 px-6">
          <Link
            href="/apartments"
            className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
          >
            View All Apartments
          </Link>
        </section>
      </>
    );
  } catch (error) {
    console.error('Error in HomeApartments:', error);
    return (
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Apartments
          </h2>
          <p className="text-center text-red-600">Failed to load recent apartments</p>
        </div>
      </section>
    );
  }
};

export default HomeApartments;
