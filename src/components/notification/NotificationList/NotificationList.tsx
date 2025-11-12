// NotificationList.tsx (수정된 전체 코드)

import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Notification } from "@/types/notification.type"; // Notification 타입 import
import NotificationItem from "../NotificationItem/NotificationItem";
import ItemSkeleton from "@/components/common/ItemSkeleton/ItemSkeleton";
import * as S from "./NotificationList.styles";

// ✨ 1. 컴포넌트가 받을 props 타입을 정의합니다.
interface NotificationListProps {
  notifications: Notification[];
  isLoading: boolean;
  isError: boolean;
}

// ✨ 2. props를 받아서 구조 분해 할당합니다.
const NotificationList = ({ notifications, isLoading, isError }: NotificationListProps) => {
  // ✨ 3. 내부에서 데이터를 호출하는 useGetNotifications 훅을 제거합니다.

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
              key={notification.createdAt} // 고유 ID가 있다면 그것을 사용하는 것이 더 좋습니다.
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