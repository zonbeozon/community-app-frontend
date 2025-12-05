import React, { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useGetCoinBySymbol } from '@/queries/useGetCoinBySymbol';
import { useGetInfiniteKlinesQuery } from '@/queries/useInfiniteKlineQueries';
import { keepPreviousData } from '@tanstack/react-query';
import { LineData } from 'lightweight-charts';
import { Chart } from '@/components/chart/Chart/Chart';
import { IndicatorSelector } from '@/components/chart/IndicatorSelector/IndicatorSelector';
import { IntervalSelector } from '@/components/chart/IntervalSelector/IntervalSelector';
import { Spinner } from '@/components/ui/spinner';
import { useFormattedChartData } from '@/hooks/chart/useFormattedChartData';
import { ChatInput } from '../ChatInput/ChatInput';
import { ChatList } from '../ChatList/ChatList';
import { ChattingGroupHeader } from '../ChattingGroupHeader/ChattingGroupHeader';
import * as S from './ChattingGroupContent.styles';

const ChattingGroupContent = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [timeScale, setTimeScale] = useState<string>('1m');
  const [indicatorData, setIndicatorData] = useState<{
    [key: string]: LineData[];
  }>({});
  const [period, setPeriod] = React.useState<number>(20);

  const { data: currentCoin, isLoading: isCoinLoading } = useGetCoinBySymbol(symbol);

  const chartParams = {
    symbol: currentCoin?.symbol ? `${currentCoin.symbol}USDT` : '',
    interval: '1m',
    limit: 500,
  };

  const {
    data: chartData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isChartLoading,
  } = useGetInfiniteKlinesQuery(chartParams, {
    placeholderData: keepPreviousData,
    enabled: !!currentCoin?.symbol,
  });

  const { candlestickData } = useFormattedChartData(chartData);

  const handleTimeScaleChange = (timeScale: string) => {
    setTimeScale(timeScale);
  };

  if (isCoinLoading || isChartLoading) {
    return <Spinner />;
  }

  if (!currentCoin) {
    return <div className={S.notFoundMessage}>❓ 존재하지 않는 종목 토론방입니다.</div>;
  }

  return (
    <div className={S.layout}>
      <div className={S.headerWrapper}>
        <ChattingGroupHeader coin={currentCoin} />
      </div>

      <div className={S.chartWrapper}>
        <div className="flex">
          <IntervalSelector value={timeScale} onChange={handleTimeScaleChange} />
          <IndicatorSelector candlestickData={candlestickData} period={period} onIndicatorChange={setIndicatorData} />
        </div>
        <Chart
          key={symbol}
          data={chartData}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          params={chartParams}
          indicatorData={indicatorData}
        />
      </div>

      <div className={S.chatSection}>
        <div className={S.scrollArea}>
          <div className={S.contentWrapper}>
            <Outlet context={{ coin: currentCoin }} />
          </div>

          <ChatList chattingGroupId={currentCoin.chattingGroupId} />
        </div>

        <div className={S.inputWrapper}>
          <ChatInput chattingGroupId={currentCoin.chattingGroupId} />
        </div>
      </div>
    </div>
  );
};

export default ChattingGroupContent;
