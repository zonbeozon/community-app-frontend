import { Outlet, useParams } from 'react-router-dom';
import { useCoinList } from '@/queries/useCoinList';
import { Spinner } from '@/components/ui/spinner';
import * as S from './ChattingGroupContent.styles';
import { useMemo } from 'react';
import { Chart } from '@/components/chart/Chart/Chart';

const ChattingGroupContent = () => {
  const { chattingGroupId } = useParams<{ chattingGroupId: string }>();
  
  const { data: coins, isLoading } = useCoinList();

  const currentCoin = useMemo(() => {
    return coins?.find((c) => String(c.chattingGroupId) === chattingGroupId);
  }, [coins, chattingGroupId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!currentCoin) {
    return <div className={S.notFoundMessage}>❓ 존재하지 않는 종목 토론방입니다.</div>;
  }


  return (
    <div className={S.layout}>
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
    </div>
  );
};

export default ChattingGroupContent;