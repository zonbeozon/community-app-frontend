import { Outlet, useParams } from 'react-router-dom';
import { useCoinList } from '@/queries/useCoinList';
import { Spinner } from '@/components/ui/spinner';
import * as S from './ChattingGroupContent.styles';
import { useMemo } from 'react';
import { keepPreviousData } from "@tanstack/react-query";
import { useInfiniteKlinesQuery } from '@/queries/useInfiniteKlineQueries';
import { Chart } from '@/components/chart/Chart/Chart';
import { ChattingGroupHeader } from '../ChattingGroupHeader/ChattingGroupHeader';
import { ChatInput } from '../ChatInput/ChatInput';

const ChattingGroupContent = () => {
  const { chattingGroupId } = useParams<{ chattingGroupId: string }>();
  
  const { data: coins, isLoading: isCoinLoading } = useCoinList();

  const currentCoin = useMemo(() => {
    return coins?.find((c) => String(c.chattingGroupId) === chattingGroupId);
  }, [coins, chattingGroupId]);

  const chartParams = {
    symbol: currentCoin?.symbol ? `${currentCoin.symbol}USDT` : "", 
    interval: "1m", 
    limit: 500,
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isChartLoading,
  } = useInfiniteKlinesQuery(chartParams, {
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
          data={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          params={chartParams}
      />
      <div className={S.contentWrapper}>
        <Outlet context={{ coin: currentCoin }} /> 
      </div>
      <div>
        <ChatInput />
      </div>
    </div>
  );
};

export default ChattingGroupContent;