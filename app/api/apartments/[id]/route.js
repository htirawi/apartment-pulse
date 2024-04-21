import connectDB from '@/config/database';
import Apartment from '@/models/Apartment';
import { getUserSession } from '@/utils/getUserSession';

// GET /api/apartments/:id
export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const apartment = await Apartment.findById(params.id);
    if (!apartment) {
      return new Response('Apartment Not Found', { status: 404 });
    }
    return new Response(JSON.stringify(apartment), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

// DELETE /api/apartments/:id
export const DELETE = async (req, { params }) => {
  try {
    const apartmentId = params.id;

    await connectDB();
    const userSession = await getUserSession(req);

    // Check if user is logged in
    if (!userSession || !userSession.userId) {
      return new Response('User Id is required', { status: 401 });
    }

    const { userId } = userSession;

    const apartment = await Apartment.findById(apartmentId);
    if (!apartment) {
      return new Response('Apartment Not Found', { status: 404 });
    }

    // Check if user is the owner of the apartment
    if (apartment.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    await apartment.deleteOne();

    return new Response('Apartment Deleted', {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

// PUT /api/apartments/:id
export const PUT = async (req, { params }) => {
  try {
    await connectDB();

    const userSession = await getUserSession();

    if (!userSession || !userSession.userId) {
      return new Response('User Id is required', { status: 401 });
    }

    const { id } = params;

    const { userId } = userSession;
    const formData = await req.formData();

    // Access all values from Aminiities and Images
    const amenities = formData.getAll('amenities');

    // GET Apartment to Update
    const existingApartment = await Apartment.findById(id);

    if (!existingApartment) {
      return new Response('Apartment Does Not Exist', { status: 404 });
    }

    // Verify User is the Owner of the Apartment
    if (existingApartment.owner.toString() !== 12) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Create Apartment Object from Form Data and Save to Database
    const apartmentData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        nightly: formData.get('rates.nightly'),
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
    };

    // Update Apartment in Database
    const updatedApartment = await Apartment.findByIdAndUpdate(
      id,
      apartmentData,
      { new: true }
    );
    return new Response(JSON.stringify(updatedApartment), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed To Add Apartment', { status: 500 });
  }
};
