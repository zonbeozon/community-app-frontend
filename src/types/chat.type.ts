import type { DialogProps, Image } from './common.type';
import type { ServerMember } from './serverMember.type';

export interface Chat {
  chatId: number;
  content: string;
  chatImages: Image[];
  author: ServerMember;
  replies: string[];
  createdAt: string;
  updatedAt: string;
  parentId?: number | null;
}

export interface ChatsResponse {
  chattingGroupId: number;
  content: {
    chatId: number;
    content: string;
    chatImages: Image[];
    author: ServerMember;
    replies: string[]
    createdAt: string;
    updatedAt: string;
  }[];
  size: number;
  totalElements: number;
  isLast: boolean;
  nextCursor: {
    createdAt: string;
    chatId: number;
  };
}

export interface ChatInputProps {
  onSubmit: (content: string) => void;
}

export interface CreateChatProps {
  chattingGroupId: number;
  payload: {
    content: string;
    imageIds: number[]
    parentId: number;
  }
}

export interface ChatItemProps {
  chat: Chat;
  isMe: boolean;
  chattingGroupId: number;
}

export interface ChatDropdownProps {
  chatId: number;
  chattingGroupId: number;
}

export interface ChatDialogProps extends DialogProps{
  chatId: number;
}

export interface ChatDeleteDialogProps {
  chatId: number | null;
  chattingGroupId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}