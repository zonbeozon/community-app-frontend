import { Coin } from './coin.type';
import { Image } from './common.type';
import { ServerMember } from './serverMember.type';

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

export interface ChattingGroupResponse {
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

export interface ChattingGroupProps {
  title: string;
  chattingGroups: Coin[];
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
