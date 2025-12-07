import type { InfiniteData } from '@tanstack/react-query';
import type { CandlestickData, IChartApi, LineData, Time } from 'lightweight-charts';

export type AllowedIndicator = 'SMA' | 'EMA' | 'RSI' | 'MACD' | 'BollingerBands' | 'ATR' | 'OBV' | 'Stochastic';
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
  string, // Unused field, ignore.
];

export interface KlinesParams {
  symbol: string;
  interval?: string;
  endTime?: number;
  limit?: number;
}

export interface KlinesData {
  klines: BinanceRestKline[];
}

export type CandleData = CandlestickData<Time> & {
  volume: number;
};

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
  indicatorData: { [key: string]: LineData[] };
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

export interface Indicator {
  id: string;
  type: AllowedIndicator;
  period?: number;
  fastPeriod?: number;
  slowPeriod?: number;
  signalPeriod?: number;
  stdDev?: number;
}

export interface IndicatorResults {
  [id: string]: (number | undefined | any)[];
}

export interface SelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export interface IndicatorSelectorProps {
  candlestickData: CandlestickData[];
  period: number;
  onIndicatorChange: (indicatorData: { [key: string]: LineData[] }) => void;
}

export interface PeriodCounterProps {
  period: number;
  setPeriod: (value: number) => void;
  isDisabled: boolean;
}
