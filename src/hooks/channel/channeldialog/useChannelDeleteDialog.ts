import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; 
import useGetJoinedChannels from '@/queries/useGetJoinedChannel';
import useDeleteChannel from '../useChannelDelete';
import { ROUTE_PATH } from '@/constants/routePaths';

interface UseChannelDeleteProps {
  channelId: number;
  onSuccess: () => void;
}

export const useChannelDeleteDialog = ({ channelId, onSuccess: onDialogClose }: UseChannelDeleteProps) => {
  const { mutate: deleteChannel, isPending } = useDeleteChannel();
  const { data: myChannels } = useGetJoinedChannels();
  const navigate = useNavigate(); 

  const channel = useMemo(() => {
    return myChannels?.find(c => c.channelInfo.channelId === channelId);
  }, [myChannels, channelId]);

  const handleDelete = () => {
    if (!channelId) return;

    deleteChannel(channelId, {
      onSuccess: () => {
        onDialogClose(); 
        navigate(ROUTE_PATH.main);
      }
    });
  };

  return {
    channel,
    handleDelete,
    isDeleting: isPending,
  };
};