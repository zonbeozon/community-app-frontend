import { useQuery } from '@tanstack/react-query';
import { getCoins } from '@/apis/http/coin.api';
import type { Coin } from '@/types/coin.type';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useCoinList = () => {
  return useQuery<Coin[]>({
    queryKey: QUERY_KEYS.coins.all,
    queryFn: () => getCoins(),
    staleTime: 1000 * 60 * 60, 
    gcTime: 1000 * 60 * 60 * 24, 
    select: (data) => data.sort((a, b) => a.rank - b.rank), 
  });
};