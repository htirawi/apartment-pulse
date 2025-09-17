import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeApartments from '@/components/HomeApartments';
import FeaturedApartments from '@/components/FeaturedApartments';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedApartments />
      <HomeApartments />
    </>
  );
};

export default HomePage;
