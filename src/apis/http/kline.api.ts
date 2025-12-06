import { fetcher } from '@/apis/fetcher';
import { ENDPOINT } from '@/apis/url';
import type { BinanceRestKline, GetKlinesParams } from '@/types/chart.type';

export const getKlines = async ({ symbol, interval, endTime, limit }: GetKlinesParams): Promise<BinanceRestKline[]> => {
  return fetcher.get<BinanceRestKline[]>({
    url: ENDPOINT.KLINE,
    params: { symbol, interval, endTime, limit },
  });
};
