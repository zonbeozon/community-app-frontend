import { fetcher } from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import type { Channel, ChannelRequest, JoinedChannelsResponse } from '@/types/channel.type';

export const getChannelById = async (channelId: number): Promise<Channel> => {
  return fetcher.get<Channel>({
    url: BASE_URL + ENDPOINT.CHANNEL_BY_ID(channelId),
  });
};

export const getJoinedChannels = async (): Promise<JoinedChannelsResponse> => {
  return fetcher.get<JoinedChannelsResponse>({
    url: BASE_URL + ENDPOINT.CHANNEL_JOINED,
  });
};

export const getJoinedChannelById = async (channelId: number): Promise<Channel> => {
  return fetcher.get<Channel>({
    url: BASE_URL + ENDPOINT.CHANNEL_JOINED_BY_ID(channelId),
  });
};

export const createChannel = async (payload: ChannelRequest): Promise<Channel> => {
  return fetcher.post<Channel>({
    url: BASE_URL + ENDPOINT.CHANNEL,
    body: payload,
  });
};

export const updateChannel = async (channelId: number, payload: ChannelRequest): Promise<Channel> => {
  return fetcher.patch<Channel>({
    url: BASE_URL + ENDPOINT.CHANNEL_BY_ID(channelId),
    body: payload,
  });
};

export const deleteChannel = async (channelId: number): Promise<void> => {
  return fetcher.delete<void>({
    url: BASE_URL + ENDPOINT.CHANNEL_BY_ID(channelId),
  });
};
