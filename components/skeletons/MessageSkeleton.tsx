const MessageSkeleton = () => {
  return (
    <div className="animate-pulse bg-white p-6 rounded-md shadow-md border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </div>
      
      <div className="mb-4">
        <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      </div>
      
      <div className="mb-4">
        <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-4/5"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <div className="h-8 bg-gray-300 rounded w-20"></div>
        <div className="h-8 bg-gray-300 rounded w-16"></div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
