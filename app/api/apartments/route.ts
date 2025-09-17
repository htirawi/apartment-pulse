import connectDB from '@/config/database';
import Apartment from '@/models/Apartment';
import { getUserSession } from '@/utils/getUserSession';
import { ApiResponseBuilder, handleApiError } from '@/utils/apiResponse';
import { apartmentSchema, paginationSchema } from '@/lib/validations';
import cloudinary from '@/config/cloudinary';

export const dynamic = 'force-dynamic';

// GET /api/apartments
export const GET = async (request: Request) => {
  try {
    await connectDB();

    // Validate pagination parameters
    const url = new URL(request.url);
    const paginationData = paginationSchema.parse({
      page: url.searchParams.get('page') || '1',
      pageSize: url.searchParams.get('pageSize') || '5',
    });

    const { page, pageSize } = paginationData;
    const skip = (page - 1) * pageSize;
    
    const totalApartments = await Apartment.countDocuments({});
    const totalPages = Math.ceil(totalApartments / pageSize);
    
    const apartments = await Apartment.find({})
      .skip(skip)
      .limit(pageSize)
      .lean(); // Use lean() for better performance

    const result = {
      apartments,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalApartments,
        pageSize,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };

    return ApiResponseBuilder.success(result, 'Apartments fetched successfully');
  } catch (error) {
    return handleApiError(error);
  }
};

// POST /api/apartments
export const POST = async (request: Request) => {
  try {
    await connectDB();

    const userSession = await getUserSession();

    if (!userSession || !userSession.userId) {
      return new Response('User Id is required', { status: 401 });
    }

    const { userId } = userSession;
    const formData = await request.formData();

    // Access all values from Amenities and Images

    const amenities = formData.getAll('amenities');
    const images = formData
      .getAll('images')
      .filter((image) => image instanceof File && image.name !== '') as File[];

    // Create Apartment Object from Form Data and Save to Database

    const apartmentData: any = {
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

    // Upload Images to Cloudinary

    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);
      // Convert the image data to base64
      const imageBase64 = imageData.toString('base64');

      const imageUpload = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: 'apartmentpulse',
        }
      );

      imageUploadPromises.push(imageUpload.secure_url);

      // Wait for all images to upload before saving apartment
      const imageUrls = await Promise.all(imageUploadPromises);
      // Add image urls to apartment data
      apartmentData.images = imageUrls;
    }

    const newApartment = new Apartment(apartmentData);
    await newApartment.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/apartments/${newApartment._id}`
    );
  } catch (error) {
    console.error(error);
    return new Response('Failed To Add Apartment', { status: 500 });
  }
};
