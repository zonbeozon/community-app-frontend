import { Outlet, useParams } from 'react-router-dom';
import { useGetCoinList } from '@/queries/useGetCoinList'; 
import { useGetCoinBySymbol } from '@/queries/useGetCoinBySymbol';
import { Spinner } from '@/components/ui/spinner';
import * as S from './ChattingGroupContent.styles';
import { useMemo } from 'react';
import { keepPreviousData } from "@tanstack/react-query";
import { useGetInfiniteKlinesQuery } from '@/queries/useInfiniteKlineQueries';
import { Chart } from '@/components/chart/Chart/Chart';
import { ChattingGroupHeader } from '../ChattingGroupHeader/ChattingGroupHeader';
import { ChatInput } from '../ChatInput/ChatInput';
import { ChatList } from '../ChatList/ChatList';

const ChattingGroupContent = () => {
  const { chattingGroupId } = useParams<{ chattingGroupId: string }>();
  
  const { data: coins } = useGetCoinList();

  const targetSymbol = useMemo(() => {
    return coins?.find((c) => String(c.chattingGroupId) === chattingGroupId)?.symbol;
  }, [coins, chattingGroupId]);

  const { 
    data: currentCoin, 
    isLoading: isCoinLoading 
  } = useGetCoinBySymbol(targetSymbol);

  const chartParams = {
    symbol: currentCoin?.symbol ? `${currentCoin.symbol}USDT` : "", 
    interval: "1m", 
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

  if (isCoinLoading || isChartLoading) {
    return <Spinner />;
  }

  if (!currentCoin) {
    return <div className={S.notFoundMessage}>❓ 존재하지 않는 종목 토론방입니다.</div>;
  }

  return (
    <div className={S.layout}>
      <ChattingGroupHeader showBackButton={false} coinData={currentCoin}/>
      
      <Chart
          data={chartData}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          params={chartParams}
      />
      
      <div className={S.contentWrapper}>
        <Outlet context={{ coin: currentCoin }} /> 
      </div>
      
      <div>
        <ChatList />
      </div>
      <div>
        <ChatInput />
      </div>
    </div>
  );
};

export default ChattingGroupContent;