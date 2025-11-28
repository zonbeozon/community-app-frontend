import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import type { NotificationResponse } from '@/types/notification.type';

export const getNotifications = async (): Promise<NotificationResponse> => {
  return fetcher.get<NotificationResponse>({
    url: BASE_URL + ENDPOINT.NOTIFICATION,
  });
};

export const notificationsRead = async (): Promise<void> => {
  return fetcher.post<void>({
    url: BASE_URL + ENDPOINT.NOTIFICATION_READ,
  });
};
