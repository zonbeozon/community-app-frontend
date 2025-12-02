import * as S from './ChattingGroupHeader.styles';
import type { ChattingHeaderProps } from '@/types/chat.type';

export const ChattingGroupHeader = ({ coinData }: ChattingHeaderProps) => {
  return (
    <div className={S.wrapper}>
      <div className={S.titleWrapper}>
        <span className={S.name}>{coinData.name}</span>
      </div>
    </div>
  );
};
