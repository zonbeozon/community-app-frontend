import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '@/apis/http/notification.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
// 공유해주신 정확한 타입을 사용합니다.
import { Notification, NotificationResponse } from '@/types/notification.type';

// 훅이 최종적으로 반환할 데이터의 형태를 정의합니다.
interface ProcessedNotifications {
  notifications: Notification[];
  unreadCount: number;
}

const useGetNotifications = () => {
  // useQuery<API응답타입, 에러타입, select가반환할최종타입>
  return useQuery<NotificationResponse, Error, ProcessedNotifications>({
    queryKey: [QUERY_KEYS.notifications],
    queryFn: getNotifications,
    staleTime: 1000 * 60, // 1분
    
    // select 옵션으로 API 응답을 컴포넌트가 쓰기 좋은 형태로 가공합니다.
    select: (data) => {
      // API 응답 객체(data)에서 실제 알림 배열과 안 읽은 개수를 추출합니다.
      // 데이터가 없을 경우를 대비해 기본값을 설정하여 안정성을 높입니다.
      const notifications = data?.pagedNotifications?.content || [];
      const unreadCount = data?.totalUnreadCount ?? 0;

      return { notifications, unreadCount };
    },
  });
};

export default useGetNotifications;