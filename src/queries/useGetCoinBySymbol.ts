import { getCoinsBySymbol } from '@/apis/http/coin.api'; 
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { CoinBySymbol } from '@/types/coin.type';

export const useGetCoinBySymbol = (symbol?: string) => {
  return useQuery<CoinBySymbol>({
    queryKey: [...QUERY_KEYS.coins.all, 'detail', symbol],
    
    queryFn: () => getCoinsBySymbol(symbol!), 
    
    enabled: !!symbol,
    staleTime: 1000 * 60 * 60, 
    gcTime: 1000 * 60 * 60 * 24,
  });
};