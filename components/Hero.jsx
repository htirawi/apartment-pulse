import ApartmentSearchForm from './ApartmentSearchForm';

const Hero = () => {
  return (
    <div>
      {/* <!-- Hero --> */}
      <section className="bg-blue-700 py-20 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Find The Perfect Apartment
            </h1>
            <p className="my-4 text-xl text-white">
              Discover the perfect apartment that suits your needs.
            </p>
          </div>
          <ApartmentSearchForm />
        </div>
      </section>
    </div>
  );
};

export default Hero;
