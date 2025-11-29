import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAtomValue, useSetAtom } from 'jotai';
import { useGetChannelById } from "@/queries/useGetChannelById";
import ChannelRoleManager from "@/utils/channelRoleManager";
import { useGetJoinedChannels } from "@/queries/useGetJoinedChannel";
import { selectedChannelIdAtom } from '@/atoms/channelAtoms';
import { ROUTE_PATH } from "@/constants/routePaths";

export const useChannelLogic = () => {
  const navigate = useNavigate();
  const { channelId, postId } = useParams<{ channelId: string; postId?: string }>();
  const selectedChannelId = useAtomValue(selectedChannelIdAtom);
  const setSelectedChannelId = useSetAtom(selectedChannelIdAtom);

  const numericChannelId = useMemo(() => {
    if (!channelId || isNaN(Number(channelId))) {
      return -1;
    }
    return Number(channelId);
  }, [channelId]);

  const { data: currentChannelData, isLoading: isChannelLoading, isError, error } = useGetChannelById(numericChannelId);
  const { data: myChannels } = useGetJoinedChannels();

  useEffect(() => {
    if (isError && (error as any)?.response?.status === 404) {
      alert("존재하지 않는 채널입니다.");
      navigate(ROUTE_PATH.main);
    }
  }, [isError, error, navigate]);

  const selectedChannel = useMemo(() => {
    if (!myChannels || !selectedChannelId) {
      return null;
    }
    return myChannels.find(
      (channel) => channel.channelInfo.channelId === selectedChannelId
    );
  }, [myChannels, selectedChannelId]);
  
  useEffect(() => {
    if (currentChannelData) {
      setSelectedChannelId(currentChannelData.channelInfo.channelId);
    }
  }, [currentChannelData, setSelectedChannelId]);

  const isMember = !!selectedChannel?.membership;
  const canCreatePost = isMember && ChannelRoleManager.isAdmin(selectedChannel.membership.channelRole);

  return {
    channelData: currentChannelData,
    selectedChannel,
    isLoading: isChannelLoading,
    isMember,
    canCreatePost,
    showBackButton: !!postId,
  };
};