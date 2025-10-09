import { format, formatDistanceToNow, differenceInHours, differenceInSeconds } from 'date-fns';
import { ko } from 'date-fns/locale';

const localizeTimezone = (dateString: string): string => {
  const correctlyFormattedString = dateString.endsWith('Z') ? dateString : dateString + 'Z';
  
  const date = new Date(correctlyFormattedString);
  const now = new Date();

  if (isNaN(date.getTime())) {
    return "유효하지 않은 날짜";
  }

  if (differenceInSeconds(now, date) < 60) {
    return "방금 전";
  }

  if (differenceInHours(now, date) < 24) {
    return formatDistanceToNow(date, { addSuffix: true, locale: ko });
  }
  
  return format(date, 'yyyy.MM.dd', { locale: ko });
};

export default localizeTimezone;