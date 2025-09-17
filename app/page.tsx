import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import ClientHomeApartments from '@/components/ClientHomeApartments';
import ClientFeaturedApartments from '@/components/ClientFeaturedApartments';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <ClientFeaturedApartments />
      <ClientHomeApartments />
    </>
  );
};

export default HomePage;
