import { toast } from "sonner";
import { queryClient } from "@/lib/queryClient";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { Notification } from "@/types/notification.type";

interface NotificationData {
  notifications: Notification[];
  unreadCount: number;
}

export const handleNotificationEvent = (eventBody: Notification) => {
  if (!eventBody || !eventBody.type || !eventBody.message) {
    return;
  }
  const notificationsQueryKey = QUERY_KEYS.notifications.lists();

  queryClient.setQueryData<NotificationData>(
    notificationsQueryKey,
    (oldData) => {
      if (!oldData) {
        return {
          notifications: [eventBody],
          unreadCount: 1,
        };
      }

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notifications.lists(),
      });

      return {
        ...oldData,
        notifications: [eventBody, ...oldData.notifications],
        unreadCount: oldData.unreadCount + 1,
      };
    }
  );

  const { type, message } = eventBody;
  if (type === "WARNING") {
    toast.warning(`경고: ${message}`);
  } else {
    toast.success("알림", { description: message });
  }
};
