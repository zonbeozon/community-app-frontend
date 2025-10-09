import fetcher from "@/apis/fetcher";
import { BASE_URL, ENDPOINT } from "@/apis/url";
import { Channel, ChannelRequest, ChannelsResponse } from "@/types/channel.type";
import { ChannelSearchResultTemp } from "@/components/channel/ChannelSearchbar/ChannelSearchbar";

export const getChannels = async (): Promise<ChannelSearchResultTemp[]> => {
  return fetcher.get<ChannelSearchResultTemp[]>({
    url: BASE_URL + ENDPOINT.CHANNEL
  });
};

export const getJoinedChannels = async (): Promise<ChannelsResponse> => {
  return fetcher.get<ChannelsResponse>({
    url: BASE_URL + ENDPOINT.CHANNEL_JOINED
  });
};

export const getJoinedChannel = async (channelId: number): Promise<Channel> => {
  return fetcher.get<Channel>({
    url: BASE_URL + ENDPOINT.CHANNEL_JOINED_BY_ID(channelId)
  });
}; 

export const createChannel = async (payload: ChannelRequest): Promise<Channel> => {
  return fetcher.post<Channel>({
    url: BASE_URL + ENDPOINT.CHANNEL_COMMUNITY,
    body: payload
  });
};

export const updateChannel = async (channelId: number, payload: ChannelRequest): Promise<Channel> => {
  return fetcher.patch<Channel>({
    url: BASE_URL + ENDPOINT.CHANNEL_BY_ID(channelId),
    body: payload
  });
};

export const deleteChannel = async (channelId: number): Promise<void> => {
  return fetcher.delete<void>({
    url: BASE_URL + ENDPOINT.CHANNEL_BY_ID(channelId)
  });
};