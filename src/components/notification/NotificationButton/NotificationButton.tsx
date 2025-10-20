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
  // 1. 훅이 이제 { notifications, unreadCount } 형태의 객체를 data로 반환합니다.
  //    데이터가 없을 때를 대비하여 기본값을 설정해줍니다.
  const { data: notificationData = { notifications: [], unreadCount: 0 } } = useGetNotifications();
  const { mutate: markAsRead, isPending } = useMarkNotificationsAsRead();

  // 2. 가공된 데이터에서 필요한 값을 바로 꺼내 씁니다.
  const { notifications, unreadCount: totalUnreadCount } = notificationData;

  // 3. 클라이언트에서 직접 계산하던 복잡한 useMemo는 더 이상 필요 없습니다. (코드 삭제)

  const handleOpenChange = (open: boolean) => {
    // 4. API가 제공하는 totalUnreadCount를 사용합니다.
    if (open && totalUnreadCount > 0) {
      markAsRead();
    }
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button className={S.notificationButton} disabled={isPending}>
          <Bell className={S.icon} />
          
          {/* 5. API가 제공하는 totalUnreadCount를 뱃지에 표시합니다. */}
          {totalUnreadCount > 0 && (
            <span className={S.unreadBadge}>
              {totalUnreadCount > 99 ? '99+' : totalUnreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className={S.dropdownContent}>
        {/* 6. NotificationList에는 실제 알림 배열을 props로 넘겨줍니다. */}
        <NotificationList notifications={notifications} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationButton;