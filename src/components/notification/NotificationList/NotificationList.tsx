import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Notification } from "@/types/notification.type"; 
import NotificationItem from "../NotificationItem/NotificationItem";
import ItemSkeleton from "@/components/common/ItemSkeleton/ItemSkeleton";
import * as S from "./NotificationList.styles";

interface NotificationListProps {
  notifications: Notification[];
  isLoading: boolean;
  isError: boolean;
}

const NotificationList = ({ notifications, isLoading, isError }: NotificationListProps) => {

  if (isLoading) {
    return (
      <div className={S.scrollableListContainer}>
        {Array.from({ length: 3 }).map((_, i) => <ItemSkeleton key={i} />)}
      </div>
    );
  }

  if (isError) {
    return (
      <DropdownMenuItem disabled className={S.emptyListMessage}>
        알림을 불러올 수 없습니다.
      </DropdownMenuItem>
    );
  }

  return (
    <>
      <DropdownMenuLabel className={S.listHeader}>알림</DropdownMenuLabel>
      <DropdownMenuSeparator />

      {notifications && notifications.length > 0 ? (
        <div className={S.scrollableListContainer}>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.createdAt}
              notification={notification}
            />
          ))}
        </div>
      ) : (
        <DropdownMenuItem disabled className={S.emptyListMessage}>
          새로운 알림이 없습니다.
        </DropdownMenuItem>
      )}
    </>
  );
};

export default NotificationList;