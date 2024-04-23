import Link from 'next/link';
import Image from 'next/image';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from 'react-icons/fa';

const FeaturedApartmentCard = ({ apartment }) => {
  const getRateDisplay = () => {
    const { rates } = apartment;
    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/night`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row">
      <Image
        src={apartment.images[0]}
        alt=""
        sizes="100vw"
        height={0}
        width={0}
        className="object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
      />

      <div className="p-6">
        <h3 className="text-xl font-bold">{apartment.name}</h3>
        <div className="text-gray-600 mb-4">{apartment.type}</div>
        <h3 className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          ${getRateDisplay()}
        </h3>
        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="inline mr-2" /> {apartment.beds}{' '}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline mr-2" /> {apartment.baths}{' '}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline mr-2" />
            {apartment.square_feet}{' '}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {apartment.rates.nightly ? (
            <p>
              <FaMoneyBill className="inline mr-2" /> Nightly
            </p>
          ) : null}

          {apartment.rates.weekly ? (
            <p>
              <FaMoneyBill className="inline mr-2" /> Weekly
            </p>
          ) : null}

          {apartment.rates.monthly ? (
            <p>
              <FaMoneyBill className="inline mr-2" /> Monthly
            </p>
          ) : null}
        </div>

        <div className="border border-gray-200 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="inline mr-2 text-lg text-orange-700" />
            <span className="text-orange-700">
              {' '}
              {apartment.location.city} {apartment.location.state}
            </span>
          </div>
          <Link
            href={`/apartments/${apartment._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedApartmentCard;
