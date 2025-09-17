const ApartmentCardSkeleton = () => {
  return (
    <div className="rounded-xl shadow-md relative animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-300 rounded-t-xl"></div>
      
      <div className="p-4">
        {/* Title and type skeleton */}
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </div>
        
        {/* Price badge skeleton */}
        <div className="absolute top-[10px] right-[10px] bg-gray-300 px-4 py-2 rounded-lg h-10 w-20"></div>

        {/* Features skeleton */}
        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
            <div className="h-4 bg-gray-300 rounded w-8"></div>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
            <div className="h-4 bg-gray-300 rounded w-8"></div>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
            <div className="h-4 bg-gray-300 rounded w-12"></div>
          </div>
        </div>

        {/* Rate types skeleton */}
        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
            <div className="h-3 bg-gray-300 rounded w-12"></div>
          </div>
        </div>

        <div className="border border-gray-100 mb-5"></div>

        {/* Location and button skeleton */}
        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex items-center gap-2 mb-4 lg:mb-0">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
          <div className="h-9 bg-gray-300 rounded-lg w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCardSkeleton;
