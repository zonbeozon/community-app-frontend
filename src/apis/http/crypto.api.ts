import fetcher from "@/apis/fetcher";
import { BASE_URL, ENDPOINT } from "@/apis/url";
import { Crypto, CryptoBySymbol } from "@/types/crypto.type";

export const getCryptos = async (): Promise<Crypto[]> => {
  return fetcher.get<Crypto[]>({
    url: BASE_URL + ENDPOINT.CRYPTOS
  });
}

export const getCryptoByySymbol = async (): Promise<CryptoBySymbol> => {
  return fetcher.get<CryptoBySymbol>({
    url: BASE_URL + ENDPOINT.CRYPTO_SYMBOL
  });
};