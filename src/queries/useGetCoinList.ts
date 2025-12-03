import { getCoins } from '@/apis/http/coin.api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { Coin } from '@/types/coin.type';

export const useGetCoinList = () => {
  return useQuery<Coin[]>({
    queryKey: QUERY_KEYS.coins.all,

    queryFn: () => getCoins(),

    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    select: (data) => data.sort((a, b) => a.rank - b.rank),
  });
};
