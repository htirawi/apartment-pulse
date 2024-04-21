'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import profileDefault from '@/assets/images/profile.png';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image || profileDefault;
  const profileName = session?.user?.name || 'User';
  const profileEmail = session?.user?.email || 'Email';

  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserApartments = async (userId) => {
      if (!userId) {
        return;
      }
      try {
        const response = await fetch(`/api/apartments/user/${userId}`);

        if (response.status === 200) {
          const data = await response.json();
          setApartments(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchUserApartments(session.user.id);
    }
  }, [session]);

  const handleDeleteApartment = async (apartmentId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this apartment?'
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`/api/apartments/${apartmentId}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        const updatedApartments = (prevApartments) =>
          prevApartments.filter((apartment) => apartment._id !== apartmentId);

        setApartments(updatedApartments);
        toast.success('Apartment Deleted');
      } else {
        toast.error('Failed to delete apartment');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete apartment');
    }
  };

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage}
                  alt="User"
                  width={200}
                  height={200}
                  sizes="100vw"
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {profileEmail}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!loading && apartments.length === 0 && (
                <div className="text-center">
                  <p className="text-lg font-semibold">
                    You Have No Apartments Listings Found
                  </p>
                </div>
              )}

              {loading ? (
                <Spinner loading={loading} />
              ) : (
                apartments.map((apartment) => (
                  <div key={apartment._id} className="mb-10">
                    <Link href={`apartments/${apartment._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={apartment.images[0] || '/images/apartments/a1.jpg'}
                        alt={apartment.name}
                        width={500}
                        height={100}
                        sizes="100vw"
                        priority={true}
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{apartment.name}</p>
                      <p className="text-gray-600">
                        Address: {apartment.location.street},{' '}
                        {apartment.location.city}, {apartment.location.state}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/apartments/${apartment._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteApartment(apartment._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
