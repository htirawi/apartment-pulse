import InfoBox from './InfoBox';
const InfoBoxes = () => {
  return (
    <div>
      {/* <!-- Renters and Owners --> */}
      <section>
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <InfoBox
              heading="For Renters"
              backgroundColor="bg-gray-100"
              buttonInfo={{
                text: 'Browse Apartments',
                link: '/apartments',
                backgroundColor: 'bg-black',
              }}
            >
              Find your dream rental apartment. Bookmark apartments and contact
              owners.
            </InfoBox>

            <InfoBox
              heading="For Apartment Owners"
              backgroundColor="bg-blue-100"
              buttonInfo={{
                text: 'Add Apartment',
                link: '/apartments/add',
                backgroundColor: 'bg-blue-500',
              }}
            >
              List your apartments and reach potential tenants. Rent as an
              airbnb or long term.
            </InfoBox>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoBoxes;
