import FormikApartmentForm from '@/components/FormikApartmentForm';

function ApartmentAddPage() {
  return (
    <section className="bg-blue-50 min-h-screen py-8">
      <div className="container m-auto max-w-4xl">
        <FormikApartmentForm />
      </div>
    </section>
  );
}

export default ApartmentAddPage;
