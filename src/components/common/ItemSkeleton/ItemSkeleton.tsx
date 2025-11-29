import { Skeleton } from '@/components/ui/skeleton';
import type { ItemSkeletonProps } from '@/types/common.type';
import * as S from './ItemSkeleton.styles';

export const ItemSkeleton = ({ count = 1 }: ItemSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={S.wrapper}>
          <Skeleton className={S.avatar} />

          <div className={S.contentContainer}>
            <div className={S.header}>
              <Skeleton className={S.username} />
              <Skeleton className={S.timestamp} />
            </div>

            <div className={S.textContainer}>
              <Skeleton className={S.textLine1} />
              <Skeleton className={S.textLine2} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
