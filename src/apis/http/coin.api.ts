import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import type { Crypto, CryptoBySymbol } from '@/types/coin.type';

export const getCoins = async (): Promise<Crypto[]> => {
  return fetcher.get<Crypto[]>({
    url: BASE_URL + ENDPOINT.CRYPTOS,
  });
};

export const getCoinsBySymbol = async (): Promise<CryptoBySymbol> => {
  return fetcher.get<CryptoBySymbol>({
    url: BASE_URL + ENDPOINT.CRYPTO_SYMBOL,
  });
};
