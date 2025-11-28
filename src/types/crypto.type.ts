export interface Crypto {
  symbol: string;
  logo: string;
  name: string;
  rank: number;
}

export interface CryptoBySymbol {
  symbol: string;
  logo: string;
  localizedInfo: {
    name: string;
    description: string;
  }
  website: string;
  metadataLastUpdated: string;
  currencyRank: number;
  circulatingSupply: number;
  totalSupply: number;
  quote: {
    marketCap: number;
    fullyDilutedMarketCap: number;
    volume24h: number;
  }
  tickerLastUpdated: string;
}
