import { useQuery } from '@tanstack/react-query';
import { getNotifications as fetchNotificationsAPI } from "@/apis/http/notification.api"; 
import { QUERY_KEYS } from '@/constants/queryKeys';
import { NotificationResponse } from '@/types/notification.type';

const useGetNotifications = () => {
  return useQuery<NotificationResponse, Error>({
    queryKey: QUERY_KEYS.notifications.lists(), 

    queryFn: fetchNotificationsAPI, 
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60 * 2,
  });
};

export default useGetNotifications;