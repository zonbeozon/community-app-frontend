import type {
  CandlestickSeriesPartialOptions,
  DeepPartial,
  HistogramSeriesPartialOptions,
  PriceScaleOptions,
} from 'lightweight-charts';
import type { ChannelPayload } from '@/types/channel.type';
import type { ChartTooltipProps } from '@/types/chart.type';
import type { PostPayload } from '@/types/post.type';

export const MAX_CHANNEL_TITLE_LENGTH = 32 as const;
export const MIN_CHANNEL_TITLE_LENGTH = 2 as const;
export const MAX_CHANNEL_DESCRIPTION_LENGTH = 256 as const;
export const MAX_POST_CONTENT_LENGTH = 2048 as const;
export const MAX_USER_NAME_LENGTH = 32 as const;
export const NOT_ALLOWED_REGEX = /[<>:"\/\\|*\x00-\x1F]/;

export const DEFAULT_PAGE_REQUEST = {
  page: 0,
  size: 20,
} as const;

export const DEFAULT_CHANNEL_VALUES: ChannelPayload = {
  title: '',
  description: '',
  imageId: null,
  settings: {
    contentVisibility: 'PUBLIC',
    joinPolicy: 'OPEN',
  },
} as const;

export const DEFAULT_POST_VALUES: PostPayload = {
  content: '',
  imageIds: [] as number[],
} as const;

export const VOLUME_PRICE_SCALE_ID = 'volume-scale';

export const CANDLESTICK_SERIES_OPTIONS: CandlestickSeriesPartialOptions = {
  upColor: 'rgba(0, 150, 136, 1)',
  downColor: 'rgba(255, 82, 82, 1)',
  borderDownColor: 'rgba(255, 82, 82, 1)',
  borderUpColor: 'rgba(0, 150, 136, 1)',
  wickDownColor: 'rgba(255, 82, 82, 1)',
  wickUpColor: 'rgba(0, 150, 136, 1)',
};

export const VOLUME_SERIES_OPTIONS: HistogramSeriesPartialOptions = {
  priceFormat: { type: 'volume' },
  priceScaleId: VOLUME_PRICE_SCALE_ID,
};

export const VOLUME_SCALE_OPTIONS: DeepPartial<PriceScaleOptions> = {
  scaleMargins: { top: 0.8, bottom: 0 },
};

export const FETCHPAGE_THRESHOLD = 20;

export const INTERVALS = ['1s', '1m', '15m', '1h', '4h', '1d', '1w', '1M'];

export const INDICATORS = [
  { value: 'ATR', label: 'Average True Range (ATR)' },
  { value: 'BollingerBands', label: 'Bollinger Bands (BB)' },
  { value: 'EMA', label: 'Exponential Moving Average (EMA)' },
  { value: 'MACD', label: 'Moving Average Convergence Divergence (MACD)' },
  { value: 'OBV', label: 'On Balance Volume (OBV)' },
  { value: 'RSI', label: 'Relative Strength Index (RSI)' },
  { value: 'SMA', label: 'Simple Moving Average (SMA)' },
  { value: 'Stochastic', label: 'Stochastic Oscillator (KD)' },
];

export const INITIAL_TOOLTIP_STATE: ChartTooltipProps = {
  top: 0,
  left: 0,
  visible: false,
};
