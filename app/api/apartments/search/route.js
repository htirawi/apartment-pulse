import connectDB from '@/config/database';
import Apartment from '@/models/Apartment';

export const dynamic = 'force-dynamic';

export const GET = async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const location = searchParams.get('location');
    const apartmentType = searchParams.get('apartmentType');

    const locationPattern = new RegExp(location, 'i');

    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { 'location.street': locationPattern },
        { 'location.city': locationPattern },
        { 'location.state': locationPattern },
        { 'location.zipcode': locationPattern },
      ],
    };

    if (apartmentType && apartmentType !== 'All') {
      const typePattern = new RegExp(apartmentType, 'i');
      query.type = typePattern;
    }

    const apartments = await Apartment.find(query);

    return new Response(JSON.stringify(apartments), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch search results', { status: 500 });
  }
};
