import { useMemo } from "react";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationList from "../NotificationList/NotificationList";
import useGetNotifications from "@/queries/useGetNotification";
import useMarkNotificationsAsRead from "@/hooks/notification/useNotificationAsRead";
import * as S from "./NotificationButton.styles";

const NotificationButton = () => {
  const { data: notifications } = useGetNotifications();
  const { mutate: markAsRead, isPending } = useMarkNotificationsAsRead();

  const totalUnreadCount = useMemo(() => {
    if (!notifications) return 0;
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const handleOpenChange = (open: boolean) => {
    if (open && totalUnreadCount > 0) {
      markAsRead();
    }
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button className={S.notificationButton} disabled={isPending}>
          <Bell className={S.icon} />
          
          {totalUnreadCount > 0 && (
            <span className={S.unreadBadge}>
              {totalUnreadCount > 99 ? '99+' : totalUnreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className={S.dropdownContent}>
        <NotificationList />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationButton;