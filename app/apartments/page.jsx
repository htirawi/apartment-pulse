import ApartmentSearchForm from '@/components/ApartmentSearchForm';
import Apartments from '@/components/Apartments';

const ApartmentsPage = async () => {
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col-items-start sm:px-6 lg:px-8">
          <ApartmentSearchForm />
        </div>
      </section>
      <Apartments />
    </>
  );
};

export default ApartmentsPage;
