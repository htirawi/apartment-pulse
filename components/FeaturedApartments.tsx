import { fetchApartments } from '@/utils/requests';
import AnimatedFeaturedApartments from './AnimatedFeaturedApartments';

const FeaturedApartments = async () => {
  const apartments = await fetchApartments({ showFeatured: true });
  return <AnimatedFeaturedApartments apartments={apartments} />;
};

export default FeaturedApartments;
