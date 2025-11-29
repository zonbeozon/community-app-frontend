import useGetNotifications from '@/queries/useGetNotification';
import { Bell } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useMarkNotificationsAsRead } from '@/hooks/notification/useNotificationAsRead';
import { NotificationList } from '../NotificationList/NotificationList';
import * as S from './NotificationButton.styles';

export const NotificationButton = () => {
  const { data: notificationData = { notifications: [], unreadCount: 0 }, isLoading, isError } = useGetNotifications();
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

          {totalUnreadCount > 0 && <span className={S.unreadBadge}>{totalUnreadCount > 99 ? '99+' : totalUnreadCount}</span>}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className={S.dropdownContent}>
        <NotificationList notifications={notifications} isLoading={isLoading} isError={isError} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
