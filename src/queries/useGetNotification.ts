import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '@/apis/http/notification.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { Notification, NotificationResponse } from '@/types/notification.type';

interface ProcessedNotifications {
  notifications: Notification[];
  unreadCount: number;
}

const useGetNotifications = () => {
  return useQuery<NotificationResponse, Error, ProcessedNotifications>({
    queryKey: [QUERY_KEYS.notifications],
    queryFn: getNotifications,
    staleTime: 1000 * 60, 

    select: (data) => {
      const notifications = data?.pagedNotifications?.content || [];
      const unreadCount = data?.totalUnreadCount ?? 0;

      return { notifications, unreadCount };
    },
  });
};

export default useGetNotifications;