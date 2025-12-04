import { Outlet, useParams } from 'react-router-dom';
import { useGetCoinBySymbol } from '@/queries/useGetCoinBySymbol'; // 상세 조회 훅
import { Spinner } from '@/components/ui/spinner';
import * as S from './ChattingGroupContent.styles';
import { keepPreviousData } from "@tanstack/react-query";
import { useGetInfiniteKlinesQuery } from '@/queries/useInfiniteKlineQueries';
import { Chart } from '@/components/chart/Chart/Chart';
import { ChattingGroupHeader } from '../ChattingGroupHeader/ChattingGroupHeader';
import { ChatInput } from '../ChatInput/ChatInput';
import { ChatList } from '../ChatList/ChatList';

const ChattingGroupContent = () => {
  const { symbol } = useParams<{ symbol: string }>();
  
  const { 
    data: currentCoin, 
    isLoading: isCoinLoading 
  } = useGetCoinBySymbol(symbol);

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
      <ChattingGroupHeader coin={currentCoin}/>
      
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
        <ChatList chattingGroupId={currentCoin.chattingGroupId}/>
      </div>
      <div>
        <ChatInput chattingGroupId={currentCoin.chattingGroupId}/>
      </div>
    </div>
  );
};

export default ChattingGroupContent;