import ApartmentCardSkeleton from './ApartmentCardSkeleton';
import { IApartmentListSkeletonProps } from '@/types/components/IApartmentListSkeleton';

const ApartmentListSkeleton = ({ count = 6 }: IApartmentListSkeletonProps) => {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, index: number) => (
            <ApartmentCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApartmentListSkeleton;
