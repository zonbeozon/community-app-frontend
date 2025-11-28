import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import type { Chat, ChattingGroupResponse } from '@/types/chat.type';

export const getChattingGroups = async (chattingGroupName: string): Promise<ChattingGroupResponse> => {
  return fetcher.get<ChattingGroupResponse>({
    url: BASE_URL + ENDPOINT.CHAT_GROUP(chattingGroupName),
  });
};

export const createChat = async (chattingGroupName: string, payload: Chat): Promise<void> => {
  return fetcher.post<void>({
    url: BASE_URL + ENDPOINT.CHAT_GROUP(chattingGroupName),
    body: payload,
  });
};

export const uploadChatImage = async (chatId: number, payload: number[]): Promise<void> => {
  return fetcher.post<void>({
    url: BASE_URL + ENDPOINT.CHAT_IMAGE(chatId),
    body: payload,
  });
};

export const deleteChatImage = async (chatId: number, payload: number[]): Promise<void> => {
  return fetcher.delete<void>({
    url: BASE_URL + ENDPOINT.CHAT_IMAGE(chatId),
    body: payload,
  });
};

export const updateChat = async (chatId: number): Promise<void> => {
  return fetcher.post<void>({
    url: BASE_URL + ENDPOINT.CHAT_ID(chatId),
  });
};

export const deleteChat = async (chatId: number): Promise<void> => {
  return fetcher.delete<void>({
    url: BASE_URL + ENDPOINT.CHAT_ID(chatId),
  });
};
