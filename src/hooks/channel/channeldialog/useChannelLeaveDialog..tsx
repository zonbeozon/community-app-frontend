import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; 
import useGetJoinedChannels from '@/queries/useGetJoinedChannel';
import useLeaveChannel from '@/hooks/channelmember/useLeaveChannel';
import { ROUTE_PATH } from '@/constants/routePaths';

interface UseChannelLeaveProps {
  channelId: number;
  onSuccess: () => void;
}

export const useChannelLeaveDialog = ({ channelId, onSuccess: onDialogClose }: UseChannelLeaveProps) => {
  const { mutate: leaveChannel, isPending } = useLeaveChannel();
  const { data: myChannels } = useGetJoinedChannels();
  const navigate = useNavigate(); 

  const channel = useMemo(() => {
    return myChannels?.find(c => c.channelInfo.channelId === channelId);
  }, [myChannels, channelId]);

  const handleLeave = () => {
    if (!channelId) return;

    leaveChannel(channelId, {
      onSuccess: () => {
        onDialogClose(); 
        navigate(ROUTE_PATH.main);
      }
    });
  };

  return {
    channel,
    handleLeave,
    isLeaving: isPending,
  };
};