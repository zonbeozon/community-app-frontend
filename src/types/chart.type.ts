import type {
  IChartApi,
  CandlestickData,
  Time,
} from "lightweight-charts";
import type { InfiniteData } from "@tanstack/react-query";

export interface ChartProps {
  data: InfiniteData<KlinesData> | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  params: {
    symbol: string;
    interval: string;
    limit: number;
  };
}

export interface InfiniteScrollParams {
  chartRef: React.RefObject<IChartApi | null>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export interface ChartTooltipProps {
  top: number;
  left: number;
  candle?: CandlestickData;
  time?: Time;
  visible: boolean;
}

export type BinanceRestKline = [
  number, // Kline open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Kline Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string // Unused field, ignore.
];

export interface KlinesData {
  klines: BinanceRestKline[];
}

export interface GetKlinesParams {
  symbol: string;
  interval?: string;
  endTime?: number;
  limit?: number;
}