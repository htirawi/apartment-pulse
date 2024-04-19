import apartments from '@/apartments.json';
import ApartmentCard from '@/components/ApartmentCard';

const ApartmentsPage = () => {
  return (
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
  );
};

export default ApartmentsPage;
