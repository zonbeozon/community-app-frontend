import { useQuery } from '@tanstack/react-query';
// import { getCoins } from '@/apis/http/coin.api'; // 잠시 주석
import type { Coin } from '@/types/coin.type';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useCoinList = () => {
  return useQuery<Coin[]>({
    queryKey: QUERY_KEYS.coins.all,
    
    // queryFn: () => getCoins(),
    
    queryFn: async () => {
      return [
        {
          symbol: "BTC",
          logo: "",
          name: "Bitcoin",
          rank: 1,
          chattingGroupId: 1,
        },
        {
          symbol: "ETH",
          logo: "",
          name: "Ethereum",
          rank: 2,
          chattingGroupId: 2,
        },
        {
          symbol: "SOL",
          logo: "",
          name: "Solana",
          rank: 3,
          chattingGroupId: 3,
        },
      ];
    },

    staleTime: 1000 * 60 * 60, 
    gcTime: 1000 * 60 * 60 * 24, 
    select: (data) => data.sort((a, b) => a.rank - b.rank), 
  });
};