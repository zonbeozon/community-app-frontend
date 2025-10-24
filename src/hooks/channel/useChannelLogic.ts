import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetAtom } from 'jotai';
import { useQueryClient } from '@tanstack/react-query';
import { useGetChannelById } from "@/queries/useGetChannelById";
import useGetJoinedChannels from "@/queries/useGetJoinedChannel";
import { selectedChannelIdAtom } from '@/atoms/channelAtoms';
import { ROUTE_PATH } from "@/constants/routePaths";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useChannelLogic = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { channelId, postId } = useParams<{ channelId: string; postId?: string }>();
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
  
  useEffect(() => {
    if (currentChannelData) {
      setSelectedChannelId(currentChannelData.channelInfo.channelId);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channels.joinedLists() });
    }
  }, [currentChannelData, setSelectedChannelId, queryClient]);

  const isMember = useMemo(() => {
    if (!myChannels || numericChannelId === -1) {
      return false;
    }
    return myChannels.some(
      (channel) => channel.channelInfo.channelId === numericChannelId
    );
  }, [myChannels, numericChannelId]);

  return {
    channelData: currentChannelData,
    isLoading: isChannelLoading,
    isMember,
    showBackButton: !!postId,
  };
};