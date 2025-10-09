import { toast } from "sonner";
import { queryClient } from '@/lib/queryClient';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { Notification } from "@/types/notification.type"; 

export const handleNotificationEvent = (eventBody: Notification) => {
  if (!eventBody || !eventBody.type || !eventBody.message) {
    console.warn("Invalid notification event body received:", eventBody);
    return;
  }

  const notificationsQueryKey = QUERY_KEYS.notifications.lists();
  queryClient.setQueryData<Notification[]>(notificationsQueryKey, (oldData) => {
    const existingNotifications = oldData || [];
    return [eventBody, ...existingNotifications];
  });

  const { type, message } = eventBody;
  switch (type) {
    case "WARNING":
      toast.warning(`경고: ${message}`);
      break;
    case "INFO":
    default:
      toast.message("알림", {
        description: message,
      });
      break;
  }
};