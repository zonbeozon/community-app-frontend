import { useEffect, useMemo } from 'react';
import useGetJoinedChannels from '@/queries/useGetJoinedChannel';
import useUpdateChannel from '@/hooks/channel/useChannelUpdate';
import useForm from "@/hooks/common/useForm";
import validateChannel from "@/validations/validateChannel";
import { DEFAULT_CHANNEL_VALUES } from "@/constants/constants";
import { ChannelRequest } from "@/types/channel.type";

interface UseChannelUpdateDialogProps {
  open: boolean;
  channelId: number;
  onSuccess: () => void;
}

type UpdateFormValues = ChannelRequest & { previewUrl?: string };

export const useChannelUpdateDialog = ({ open, channelId, onSuccess }: UseChannelUpdateDialogProps) => {
  const { data: myChannels } = useGetJoinedChannels();
  const { mutate: updateChannel, isPending: isMutating } = useUpdateChannel();

  const channelToUpdate = useMemo(() => {
    return myChannels?.find(c => c.channelInfo.channelId === channelId);
  }, [myChannels, channelId]);

  const {
    values,
    errors,
    handler,
    isValid,
    reset,
    setValues,
    isSubmitting,
    handleSubmit,
  } = useForm<UpdateFormValues>(DEFAULT_CHANNEL_VALUES, validateChannel);

  useEffect(() => {
    if (open && channelToUpdate) {
      setValues({
        title: channelToUpdate.channelInfo.title,
        description: channelToUpdate.channelInfo.description,
        imageId: channelToUpdate.channelInfo.profile?.imageId || null,
        channelType: channelToUpdate.channelInfo.channelType,
        settings: {
          ...DEFAULT_CHANNEL_VALUES.settings,
          ...channelToUpdate.channelInfo.settings,
        },
        previewUrl: channelToUpdate.channelInfo.profile?.imageUrl,
      });
    } else if (!open) {
      reset();
    }
  }, [open, channelToUpdate, setValues, reset]);

  const handleUpdateChannel = (data: ChannelRequest) => {
    updateChannel({ channelId, payload: data }, {
      onSuccess: () => {
        onSuccess();
        reset();
      }
    });
  };

  const submitForm = handleSubmit(handleUpdateChannel);

  return {
    formValues: values,
    formErrors: errors,
    formHandler: handler,
    isFormValid: isValid,
    isSubmitting: isSubmitting || isMutating,
    submitForm,
  };
};