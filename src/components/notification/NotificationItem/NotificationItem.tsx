import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Notification } from "@/types/notification.type";
import TimeDisplay from "@/components/common/TimeDisplay/TimeDisplay";
import * as S from "./NotificationItem.styles";

const NotificationItem = ({ notification }: { notification: Notification }) => {
  return (
    <DropdownMenuItem
      className={S.menuItem({ isRead: notification.isRead })}
    >
      <p className={S.messageText}>{notification.message}</p>
      
      <TimeDisplay
        createdAt={notification.createdAt}
      />
    </DropdownMenuItem>
  );
};

export default NotificationItem;