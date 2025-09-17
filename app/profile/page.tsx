'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import profileDefault from '@/assets/images/profile.png';
import ApartmentCard from '@/components/ApartmentCard';
import ApartmentListSkeleton from '@/components/skeletons/ApartmentListSkeleton';
import { useUserApartments } from '@/hooks/useUserApartments';

const ProfilePage = () => {
  const { data: session } = useSession();
  const { apartments, loading, error, deleteApartment } = useUserApartments();
  
  const profileImage = session?.user?.image || profileDefault;
  const profileName = session?.user?.name || 'User';
  const profileEmail = session?.user?.email || 'Email';

  if (loading) {
    return (
      <section className="bg-blue-50">
        <div className="container m-auto py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
            <ApartmentListSkeleton count={3} />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-blue-50">
        <div className="container m-auto py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

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
                  width={200}
                  height={200}
                  alt="User"
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
              {apartments.length === 0 ? (
                <p>You have no apartment listings</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {apartments.map((apartment) => (
                    <div key={apartment._id}>
                      <ApartmentCard apartment={apartment} />
                      <div className="mt-2">
                        <Link
                          href={`/apartments/${apartment._id}/edit`}
                          className="bg-blue-500 hover:bg-blue-600 text-white text-center py-1 px-3 rounded-md mr-2"
                        >
                          Edit
                        </Link>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                          type="button"
                          onClick={() => deleteApartment(apartment._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
