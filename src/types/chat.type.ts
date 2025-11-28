import { Image } from "./common.type";
import { ServerMember } from "./serverMember.type";

export interface Chat {
  content: string;
  imageIds: number[];
  parentId: number;
}

export interface ChattingGroupResponse {
  chattingGroupId: number;
  content: {
    content: string;
    chatImages: Image[];
    author: ServerMember;
    createdAt: string;
    updatedAt: string;
  }[];
  totalPages: number;
  totalElements: number;
  nextCursor: {
    createdAt: string;
    chatId: number;
  };
}
