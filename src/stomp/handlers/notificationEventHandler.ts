import { toast } from "sonner";
import { queryClient } from "@/lib/queryClient";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { Notification } from "@/types/notification.type";

export const handleNotificationEvent = (eventBody: Notification) => {
  if (!eventBody?.type || !eventBody?.message) {
    return;
  }

  queryClient.invalidateQueries({
    queryKey: QUERY_KEYS.notifications.lists(),
  });

  const { type, message } = eventBody;
  if (type === "WARNING") {
    toast.warning(`경고: ${message}`);
  } else {
    toast.success("알림", { description: message });
  }
};