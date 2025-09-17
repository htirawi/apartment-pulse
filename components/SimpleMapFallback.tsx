import { useState } from 'react';
import { ISimpleMapFallbackProps } from '@/types/components/ISimpleMapFallback';

const SimpleMapFallback = ({ apartment }: ISimpleMapFallbackProps) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const address = `${apartment.location.street}, ${apartment.location.city}, ${apartment.location.state} ${apartment.location.zipcode}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
      <div className="text-center">
        <div className="mb-4">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Property Location</h3>
          <p className="text-gray-600 mb-4">{address}</p>
        </div>
        
        <div className="space-y-3">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            View on Google Maps
          </a>
          
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="block w-full text-sm text-gray-600 hover:text-gray-800 underline"
          >
            {showInstructions ? 'Hide' : 'Show'} Mapbox Setup Instructions
          </button>
        </div>

        {showInstructions && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg text-left">
            <h4 className="font-semibold text-blue-800 mb-2">Enable Interactive Maps</h4>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://account.mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">Mapbox Account</a></li>
              <li>Create or sign in to your account</li>
              <li>Go to &quot;Access Tokens&quot; section</li>
              <li>Copy your default public token (starts with &apos;pk.&apos;)</li>
              <li>Update NEXT_PUBLIC_MAPBOX_TOKEN in your .env.local file</li>
              <li>Restart your development server</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleMapFallback;
