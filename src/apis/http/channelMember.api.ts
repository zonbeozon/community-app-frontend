import fetcher from "@/apis/fetcher";
import { BASE_URL, ENDPOINT } from "@/apis/url";
import { PageRequest } from "@/types/common.type";
import api from "../interceptor";
import { ChannelMembersResponse, ChannelRole } from "@/types/channelMember.type";

export const getChannelMembers = async (channelId: number, pageRequest: PageRequest): Promise<ChannelMembersResponse> => {
  return await fetcher.get<ChannelMembersResponse>({
    url: BASE_URL + ENDPOINT.CHANNELMEMBER(channelId),
    params: pageRequest,
  });
};

export const joinChannel = async (
  channelId: number
): Promise<{ status: number }> => {
  const response = await api.post(BASE_URL + ENDPOINT.CHANNELMEMBER(channelId));
  return { status: response.status };
};

export const leaveChannel = async (channelId: number): Promise<void> => {
  return await fetcher.delete<void>({
    url: BASE_URL + ENDPOINT.CHANNELMEMBER(channelId)
  });
};

export const denyChannelMember = async (channelId: number, memberId: number): Promise<void> => {
  return await fetcher.post<void>({
    url: BASE_URL + ENDPOINT.CHANNELMEMBER_DENY(channelId, memberId)
  });
};

export const banChannelMember = async (channelId: number, memberId: number): Promise<void> => {
  return await fetcher.post<void>({
    url: BASE_URL + ENDPOINT.CHANNELMEMBER_BAN(channelId, memberId)
  });
};

export const unbanChannelMember = async (channelId: number, memberId: number): Promise<void> => {
  return await fetcher.delete<void>({
    url: BASE_URL + ENDPOINT.CHANNELMEMBER_BAN(channelId, memberId)
  });
};

export const approveChannelMember = async (channelId: number, memberId: number): Promise<void> => {
  return await fetcher.post<void>({
    url: BASE_URL + ENDPOINT.CHANNELMEMBER_APPROVE(channelId, memberId)
  });
};

export const updateChannelMemberRole = async (channelId: number, memberId: number, wantToRole: ChannelRole): Promise<void> => {
  return await fetcher.patch<void>({
    url: BASE_URL + ENDPOINT.CHANNELMEMBER_ROLE(channelId, memberId),
    params: { wantTo: wantToRole }
  });
};

export const getPendingChannelMembers = async (channelId: number, pageRequest: PageRequest): Promise<ChannelMembersResponse> => {
  return await fetcher.get<ChannelMembersResponse>({
    url: BASE_URL + ENDPOINT.CHANNELMEMBER_PENDING(channelId),
    params: pageRequest
  });
}

export const getBannedChannelMembers = async (channelId: number, pageRequest: PageRequest): Promise<ChannelMembersResponse> => {
  return await fetcher.get<ChannelMembersResponse>({
    url: BASE_URL + ENDPOINT.CHANNELMEMBER_BANNED(channelId),
    params: pageRequest
  });
};