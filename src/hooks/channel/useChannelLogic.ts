import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetAtom } from 'jotai';
import useGetJoinedChannels from "@/queries/useGetJoinedChannel";
import { selectedChannelIdAtom } from '@/atoms/channelAtoms';
import { ROUTE_PATH } from "@/constants/routePath";

export const useChannelLogic = () => {
  const navigate = useNavigate();
  const { channelId, postId } = useParams<{ channelId: string; postId?: string }>();
  const { data: myChannels, isLoading } = useGetJoinedChannels();
  const setSelectedChannelId = useSetAtom(selectedChannelIdAtom);

  const numericChannelId = useMemo(() => {
    if (!channelId || isNaN(Number(channelId))) {
      return -1;
    }
    return Number(channelId);
  }, [channelId]);

  useEffect(() => {
    if (isLoading || !myChannels) {
      return; 
    }
  
    const channelExists = myChannels.some(
      (channel) => channel.channelInfo.channelId === numericChannelId
    );
    
    if (channelExists) {
      setSelectedChannelId(numericChannelId);
    } else {
      navigate(ROUTE_PATH.main);
    }
  }, [numericChannelId, myChannels, isLoading, setSelectedChannelId, navigate]);

  const currentChannel = useMemo(() => {
    if (!myChannels || numericChannelId === -1) {
      return null;
    }
    return myChannels.find(
      (channel) => channel.channelInfo.channelId === numericChannelId
    ) || null;
  }, [myChannels, numericChannelId]);

  return {
    numericChannelId,
    currentChannel,
    showBackButton: !!postId,
  };
};