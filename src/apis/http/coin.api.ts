import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import type { Coin, CryptoBySymbol } from '@/types/coin.type';

export const getCoins = async (): Promise<Coin[]> => {
  return fetcher.get<Coin[]>({
    url: BASE_URL + ENDPOINT.CRYPTOS,
  });
};

export const getCoinsBySymbol = async (): Promise<CryptoBySymbol> => {
  return fetcher.get<CryptoBySymbol>({
    url: BASE_URL + ENDPOINT.CRYPTO_SYMBOL,
  });
};
