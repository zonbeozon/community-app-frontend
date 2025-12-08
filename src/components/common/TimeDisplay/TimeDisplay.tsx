import { localizeTimezone } from '@/utils/localizeTimezone';
import * as S from './TimeDisplay.styles';

export const TimeDisplay = ({ createdAt }: { createdAt: string }) => {
  if (!createdAt) {
    return null;
  }
  const formattedDate = localizeTimezone(createdAt);

  return (
    <time dateTime={createdAt} className={S.timestamp}>
      {formattedDate}
    </time>
  );
};
