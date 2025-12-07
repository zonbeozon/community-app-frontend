import { fetcher } from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import type { Chat, ChatsResponse } from '@/types/chat.type';

export const getChats = async (chattingGroupId: number): Promise<ChatsResponse> => {
  return fetcher.get<ChatsResponse>({
    url: BASE_URL + ENDPOINT.CHAT_GROUP(chattingGroupId),
  });
};

export const createChat = async (chattingGroupId: number, payload: Chat): Promise<number> => {
  return fetcher.post<number>({
    url: BASE_URL + ENDPOINT.CHAT_GROUP(chattingGroupId),
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
