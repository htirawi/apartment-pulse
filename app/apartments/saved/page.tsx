'use client';

import ApartmentCard from '@/components/ApartmentCard';
import ApartmentListSkeleton from '@/components/skeletons/ApartmentListSkeleton';
import { useSavedApartments } from '@/hooks/useSavedApartments';

const SavedApartmentsPage = () => {
  const { savedApartments, loading, error } = useSavedApartments();

  if (loading) {
    return (
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Saved Apartments
          </h1>
          <ApartmentListSkeleton count={6} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Saved Apartments
          </h1>
          <p className="text-center text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Saved Apartments
        </h1>
        {savedApartments.length === 0 ? (
          <p className="text-center text-gray-600">No saved apartments found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedApartments.map((apartment) => (
              <ApartmentCard key={apartment._id} apartment={apartment} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedApartmentsPage;
