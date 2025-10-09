import { Page } from "./common.type";

export type NotificationType = "INFO" | "WARNING"

export interface Notification {
  type: NotificationType;
  message: string;
  isRead: boolean;
  createdAt: string; 
};

export interface NotificationResponse {
  pagedNotifications: Page<Notification>;
  totalUnreadCount: number;
};

export interface NotificationStore {
  notifications: Notification[];
  totalUnreadCount: number;
  setInitialNotifications: (data: NotificationResponse) => void;
  addNotification: (newNotification: Notification) => void;
  markAllAsRead: () => void;
};