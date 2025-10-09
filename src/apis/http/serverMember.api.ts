import fetcher from "@/apis/fetcher";
import { BASE_URL, ENDPOINT } from "@/apis/url";
import { ServerMember, ServerMembersResponse } from "@/types/serverMember.type";

export const getServerMembers = async (): Promise<ServerMembersResponse> => {
  return await fetcher.get<ServerMembersResponse>({
    url: BASE_URL + ENDPOINT.SERVERMEMBER
  });
};

export const getServerMemberById = async (memberId: number): Promise<ServerMember> => {
  return await fetcher.get<ServerMember>({
    url: BASE_URL + ENDPOINT.SERVERMEMBER_BY_ID(memberId)
  });
};

export const updateServerMemberUserName = async (payload: { username: string }): Promise<void> => {
  return await fetcher.patch<void>({
    url: BASE_URL + ENDPOINT.SERVERMEMBER_USERNAME,
    body: payload
  });
};

export const updateServerMemberProfile = async (payload: { imageId: number }): Promise<void> => {
  return await fetcher.patch<void>({
    url: BASE_URL + ENDPOINT.SERVERMEMBER_PROFILE,
    body: payload
  });
};

export const deleteServerMember = async (): Promise<void> => {
  return await fetcher.delete<void>({
    url: BASE_URL + ENDPOINT.SERVERMEMBER
  });
};
