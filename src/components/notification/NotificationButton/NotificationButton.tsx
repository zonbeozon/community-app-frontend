// NotificationButton.tsx (수정된 전체 코드)

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
  // ✨ 1. isLoading, isError 상태도 함께 가져옵니다.
  const { 
    data: notificationData = { notifications: [], unreadCount: 0 },
    isLoading,
    isError
  } = useGetNotifications();
  
  const { mutate: markAsRead, isPending } = useMarkNotificationsAsRead();

  const { notifications, unreadCount: totalUnreadCount } = notificationData;

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
        <NotificationList 
          notifications={notifications}
          isLoading={isLoading}
          isError={isError}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationButton;