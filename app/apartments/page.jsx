import ApartmentCard from '@/components/ApartmentCard';
import ApartmentSearchForm from '@/components/ApartmentSearchForm';

import { fetchApartments } from '@/utils/requests';

const ApartmentsPage = async () => {
  const apartments = await fetchApartments();
  apartments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col-items-start sm:px-6 lg:px-8">
          <ApartmentSearchForm />
        </div>
      </section>
      (
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
        </div>
      </section>
      )
    </>
  );
};

export default ApartmentsPage;
