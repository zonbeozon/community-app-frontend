import { getKlines } from '@/apis/http/kline.api';
import { type InfiniteData, type QueryKey, type UseInfiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { KlinesParams } from '@/types/chart.type';
import type { KlinesData } from '@/types/chart.type';

export const useGetInfiniteKlinesQuery = (
  params: KlinesParams,
  options?: Omit<
    UseInfiniteQueryOptions<KlinesData, Error, InfiniteData<KlinesData>, QueryKey, number | undefined>,
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
  >,
) => {
  return useInfiniteQuery<KlinesData, Error, InfiniteData<KlinesData>, QueryKey, number | undefined>({
    queryKey: QUERY_KEYS.klines.list(params),

    queryFn: async ({ pageParam }) => {
      const rawData = await getKlines({ ...params, endTime: pageParam });
      return { klines: rawData };
    },

    getNextPageParam: (lastPage) => {
      const lastCandles = lastPage.klines;

      if (typeof params.limit !== 'number' || lastCandles.length < params.limit) {
        return undefined;
      }

      const oldestCandleTime = lastCandles.sort((a, b) => a[0] - b[0])[0]?.[0];

      if (!oldestCandleTime) {
        return undefined;
      }

      return oldestCandleTime - 1;
    },

    initialPageParam: undefined,
    enabled: !!params.symbol && typeof params.limit === 'number',

    ...options,
  });
};
