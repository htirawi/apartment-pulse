import { fetchApartments } from '@/utils/requests';
import FeaturedApartmentCard from './FeaturedApartmentCard';

const FeaturedApartments = async () => {
  const apartments = await fetchApartments({ showFeatured: true });
  console.log(apartments);
  return (
    apartments.length > 0 && (
      <section className="bg-blue-50 px-4 pt-6 pb-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {apartments.map((apartment) => (
              <FeaturedApartmentCard
                key={apartment._id}
                apartment={apartment}
              />
            ))}
          </div>
        </div>
      </section>
    )
  );
};

export default FeaturedApartments;
