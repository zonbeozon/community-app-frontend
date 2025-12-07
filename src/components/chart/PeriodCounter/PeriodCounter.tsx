import { Counter } from '@/components/ui/counter';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import type { PeriodCounterProps } from '@/types/chart.type';
import * as S from './PeriodCounter.styles';

export const PeriodCounter = ({ period, setPeriod, isDisabled }: PeriodCounterProps) => {
  return isDisabled ? (
    <HoverCard openDelay={100} closeDelay={50}>
      <HoverCardTrigger asChild>
        <Counter number={period} setNumber={setPeriod} disabled={isDisabled} min={1} max={60} className={S.counter} />
      </HoverCardTrigger>
      <HoverCardContent side="top">
        <div>
          <span className={S.disabledMessage}>보조지표 계산 주기는 보조지표를 활성화 한 후 설정 가능합니다.</span>
        </div>
      </HoverCardContent>
    </HoverCard>
  ) : (
    <Counter number={period} setNumber={setPeriod} disabled={isDisabled} min={1} max={60} />
  );
};
