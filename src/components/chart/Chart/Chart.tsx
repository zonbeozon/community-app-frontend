import { useRef, useEffect, useState } from "react";
import { createChart } from "lightweight-charts";
import { ChartTooltip } from "../ChartTooltip/ChartTooltip";
import { useFormattedChartData } from "@/hooks/chart/useFormattedChartData";
import { useChartInfiniteScroll } from "@/hooks/chart/useChartInfiniteScroll";
import { useRealTimeTrade } from "@/hooks/chart/useRealTimeTrade";
import {
  CANDLESTICK_SERIES_OPTIONS,
  VOLUME_SERIES_OPTIONS,
  VOLUME_SCALE_OPTIONS,
  VOLUME_PRICE_SCALE_ID,
  INITIAL_TOOLTIP_STATE,
} from "@/constants/constants";
import type {
  IChartApi,
  ISeriesApi,
  CandlestickData,
  HistogramData,
} from "lightweight-charts";
import type { ChartProps, ChartTooltipProps } from "@/types/chart.type";
import * as S from "./Chart.styles";

export const Chart = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  params,
}: ChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  const [tooltipState, setTooltipState] = useState<ChartTooltipProps>(
    INITIAL_TOOLTIP_STATE
  );

  const { candlestickData, volumeData } = useFormattedChartData(data);
  const { handleVisibleLogicalRangeChange, visibleRangeRef, scrollLockRef } =
    useChartInfiniteScroll({
      chartRef,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    });

  const latestPriceRef = useRealTimeTrade(params.symbol);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, S.chartOptions);
    
    chart
      .timeScale()
      .subscribeVisibleLogicalRangeChange(handleVisibleLogicalRangeChange);

    chart.priceScale("right").applyOptions({
      scaleMargins: {
        top: 0.1,
        bottom: 0.1,
      },
    });

    const candleSeries = chart.addCandlestickSeries(CANDLESTICK_SERIES_OPTIONS);
    const volumeSeries = chart.addHistogramSeries(VOLUME_SERIES_OPTIONS);
    chart.priceScale(VOLUME_PRICE_SCALE_ID).applyOptions(VOLUME_SCALE_OPTIONS);

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    const resizeObserver = new ResizeObserver((entries) => {
      if (
        entries.length === 0 ||
        entries[0].target !== chartContainerRef.current
      ) {
        return;
      }
      const newRect = entries[0].contentRect;
      chart.applyOptions({ height: newRect.height, width: newRect.width });
    });
    resizeObserver.observe(chartContainerRef.current);

    chart.subscribeCrosshairMove((param) => {
      const container = chartContainerRef.current;
      const series = candleSeriesRef.current;
      
      if (!container || !series || !param.point || !param.time) {
        setTooltipState((prev) => ({ ...prev, visible: false }));
        return;
      }

      const candle = param.seriesData.get(series) as CandlestickData;
      if (!candle) {
        setTooltipState((prev) => ({ ...prev, visible: false }));
        return;
      }

      const chartRect = container.getBoundingClientRect();
      const containerWidth = container.clientWidth;

      const tooltipWidth = 210;
      const tooltipHeight = 70;
      const margin = 15;

      const isRightSide = param.point.x > containerWidth / 2;

      let left;
      if (isRightSide) {
        left = chartRect.left + param.point.x - tooltipWidth - margin;
      } else {
        left = chartRect.left + param.point.x + margin;
      }

      let top = chartRect.top + param.point.y - tooltipHeight - margin;
      if (top < 0) {
        top = chartRect.top + param.point.y + margin;
      }

      setTooltipState({ top, left, candle, time: param.time, visible: true });
    });

    return () => {
      resizeObserver.disconnect();
      chart.remove(); 
      chartRef.current = null;
      candleSeriesRef.current = null;
      volumeSeriesRef.current = null;
    };
  }, [handleVisibleLogicalRangeChange]); 

  useEffect(() => {
    if (!candleSeriesRef.current || !volumeSeriesRef.current) return;

    candleSeriesRef.current.setData(candlestickData);
    volumeSeriesRef.current.setData(volumeData as HistogramData[]);

    if (visibleRangeRef.current && data?.pages) {
      const addedDataCount = data.pages[0]?.klines.length ?? 0;
      
      if (addedDataCount > 0) {
        const newFrom = visibleRangeRef.current.from + addedDataCount;
        const newTo = visibleRangeRef.current.to + addedDataCount;

        chartRef.current
          ?.timeScale()
          .setVisibleLogicalRange({ from: newFrom, to: newTo });
      }
      
      visibleRangeRef.current = null;

      setTimeout(() => {
        scrollLockRef.current = false;
      }, 100);
    }
  }, [candlestickData, volumeData, data, visibleRangeRef, scrollLockRef]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const series = candleSeriesRef.current;
      const lastPrice = latestPriceRef.current;

      if (!series || !lastPrice || candlestickData.length === 0) return;

      const lastCandle = candlestickData[candlestickData.length - 1];
      
      const newTick: CandlestickData = {
        time: lastCandle.time,
        open: lastCandle.open,
        high: Math.max(lastCandle.high, lastPrice),
        low: Math.min(lastCandle.low, lastPrice),
        close: lastPrice,
      };
      
      series.update(newTick);
    }, 200);

    return () => clearInterval(intervalId);
  }, [candlestickData, latestPriceRef]);

  return (
    <>
      <div ref={chartContainerRef} className={S.chart} />
      <ChartTooltip {...tooltipState} />
    </>
  );
};