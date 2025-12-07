import { fetcher } from '@/apis/fetcher';
import { api } from '@/apis/interceptor';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import type { ChannelMembersResponse, ChannelMemberRole } from '@/types/channelMember.type';
import type { PagePayload } from '@/types/common.type';

export const getChannelMembers = async (channelId: number, pagePayload: PagePayload): Promise<ChannelMembersResponse> => {
  return await fetcher.get<ChannelMembersResponse>({
    url: BASE_URL + ENDPOINT.CHANNELMEMBER(channelId),
    params: pagePayload,
  });
};

//using api due to get response status
export const joinChannel = async (channelId: number): Promise<{ status: number }> => {
  const response = await api.post(BASE_URL + ENDPOINT.CHANNELMEMBER(channelId));
  return { status: response.status };
};

export const leaveChannel = async (channelId: number): Promise<void> => {
  return await fetcher.delete<void>({
    url: BASE_URL + ENDPOINT.CHANNELMEMBER(channelId),
  });
};

export const denyChannelMember = async (channelId: number, memberId: number): Promise<void> => {
  return await fetcher.post<void>({
    url: BASE_URL + ENDPOINT.CHANNELMEMBER_DENY(channelId, memberId),
  });
};

export const banChannelMember = async (channelId: number, memberId: number): Promise<void> => {
  return await fetcher.post<void>({
    url: BASE_URL + ENDPOINT.CHANNELMEMBER_BAN(channelId, memberId),
  });
};

export const unbanChannelMember = async (channelId: number, memberId: number): Promise<void> => {
  return await fetcher.delete<void>({
    url: BASE_URL + ENDPOINT.CHANNELMEMBER_BAN(channelId, memberId),
  });
};

export const approveChannelMember = async (channelId: number, memberId: number): Promise<void> => {
  return await fetcher.post<void>({
    url: BASE_URL + ENDPOINT.CHANNELMEMBER_APPROVE(channelId, memberId),
  });
};

export const updateChannelMemberRole = async (
  channelId: number,
  memberId: number,
  wantToRole: ChannelMemberRole,
): Promise<void> => {
  return await fetcher.patch<void>({
    url: BASE_URL + ENDPOINT.CHANNELMEMBER_ROLE(channelId, memberId),
    params: { wantTo: wantToRole },
  });
};

export const getPendingChannelMembers = async (
  channelId: number,
  pagePayload: PagePayload,
): Promise<ChannelMembersResponse> => {
  return await fetcher.get<ChannelMembersResponse>({
    url: BASE_URL + ENDPOINT.CHANNELMEMBER_PENDING(channelId),
    params: pagePayload,
  });
};

export const getBannedChannelMembers = async (
  channelId: number,
  pagePayload: PagePayload,
): Promise<ChannelMembersResponse> => {
  return await fetcher.get<ChannelMembersResponse>({
    url: BASE_URL + ENDPOINT.CHANNELMEMBER_BANNED(channelId),
    params: pagePayload,
  });
};
