import { CrosshairMode } from 'lightweight-charts';

export const chartOptions = {
  crosshair: {
    mode: CrosshairMode.Normal,
  },
  layout: {
    background: { color: '#FFFFFF' },
    textColor: '#191919',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
  },
  grid: {
    vertLines: { color: 'rgba(197, 203, 206, 0.2)' },
    horzLines: { color: 'rgba(197, 203, 206, 0.2)' },
  },
  rightPriceScale: { borderColor: 'rgba(197, 203, 206, 0.8)' },
  timeScale: { borderColor: 'rgba(197, 203, 206, 0.8)' },
  watermark: {
    color: 'rgba(197, 203, 206, 0.5)',
    visible: true,
    text: 'junhocode',
    fontSize: 24,
  },
};

export const statusContainer = 'flex items-center justify-center';

export const errorContainer = `${statusContainer} text-red-500`;

export const chart = 'relative w-auto h-[40vh] m-4 rounded-lg overflow-hidden shadow-sm border border-gray-200';
