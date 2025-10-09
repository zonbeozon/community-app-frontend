import { NotificationType } from "./notification.type";

export type DefaultEventType = "CREATED" | "UPDATED" | "DELETED";
export type ChannelMemberEventType = "BANNED" | "UNBANNED" | "JOIN_REQUEST_APPROVED" | "JOIN_REQUEST_REJECTED";

export interface ChannelEvent {
  type: DefaultEventType;
  channelId: number;
  body: any;
};

export interface ChannelMemberEvent {
  type: ChannelMemberEventType;
  channelId: number;
};

export interface PostEvent {
  type: DefaultEventType;
  postId: number;
  channelId: number;
  body: any;
};

export interface CommentEvent {
  type: DefaultEventType;
  postId: number;
  body: any;
};

export interface CommentCountEvent {
  postId: number;
  commentCount: number;
};

export interface NotificationEvent {
  type: NotificationType;
  content: string;
  isRead: boolean;
  createdAt: string;
}