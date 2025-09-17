import { fetchApartmentsFromDB } from '@/utils/serverRequests';
import AnimatedFeaturedApartments from './AnimatedFeaturedApartments';

const FeaturedApartments = async () => {
  const apartments = await fetchApartmentsFromDB({ showFeatured: true });
  return <AnimatedFeaturedApartments apartments={apartments} />;
};

export default FeaturedApartments;
