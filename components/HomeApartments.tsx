import Link from 'next/link';

import ApartmentCard from '@/components/ApartmentCard';
import { fetchApartments } from '@/utils/requests';

const HomeApartments = async () => {
  const data = await fetchApartments();

  // Handle both old and new API response formats
  const apartmentsList = (data as any)?.apartments || data;
  const recentApartments = Array.isArray(apartmentsList) 
    ? apartmentsList
        .sort(() => Math.random() - Math.random())
        .slice(0, 3)
    : [];
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
};

export default HomeApartments;
