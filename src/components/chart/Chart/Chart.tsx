import { useEffect, useRef } from 'react';
import {
  createChart, IChartApi, ISeriesApi, UTCTimestamp,
  CandlestickData, CandlestickSeries, ColorType,
} from 'lightweight-charts';
import { useSse, BinanceKlineData } from '@/sse/SseProvider';

const ChartComponent = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

  const { lastMessage } = useSse<BinanceKlineData>();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const container = chartContainerRef.current;
    
    const chartOptions = {
      layout: {
        textColor: 'black',
        background: { type: ColorType.Solid, color: 'white' },
      },
      timeScale: { 
        timeVisible: true, 
        secondsVisible: false 
      },
      // ✅ [수정] 가격 축(Y축) 설정을 추가하여 자동 줌인 효과를 줍니다.
      priceScale: {
        // autoScale을 true로 유지하여 자동으로 스케일을 조정하게 합니다. (기본값)
        autoScale: true, 
        // 보이는 데이터의 최고가 위로 30%의 여백, 최저가 아래로 20%의 여백만 남깁니다.
        // 이 값을 조절하여 줌인 정도를 변경할 수 있습니다.
        scaleMargins: {
          top: 0.3,    // 위쪽 여백 (30%)
          bottom: 0.2, // 아래쪽 여백 (20%)
        },
        // 가격 축의 경계선을 그려서 더 보기 좋게 만듭니다.
        borderColor: '#cccccc',
      },
    };

    const chart = createChart(container, chartOptions);
    const candlestickSeries = chart.addSeries(CandlestickSeries, {});
    candlestickSeriesRef.current = candlestickSeries;

    // 과거 데이터 API 연동 시 이 부분에 setData() 호출
    // 예: candlestickSeries.setData(pastData);

    const handleResize = () => chart.resize(container.clientWidth, 400);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!lastMessage || !candlestickSeriesRef.current) return;

    if (lastMessage.e === 'kline') {
      const candleData = lastMessage.k;
      const newCandle: CandlestickData = {
        time: (candleData.t / 1000) as UTCTimestamp,
        open: parseFloat(candleData.o),
        high: parseFloat(candleData.h),
        low: parseFloat(candleData.l),
        close: parseFloat(candleData.c),
      };
      candlestickSeriesRef.current.update(newCandle);
    }
  }, [lastMessage]);

  return (
    <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }} />
  );
};

export default ChartComponent;