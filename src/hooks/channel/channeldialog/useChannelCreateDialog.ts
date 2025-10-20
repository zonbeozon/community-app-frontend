import { useEffect } from 'react';
import useForm from '@/hooks/common/useForm';
import useCreateChannel from '@/hooks/channel/useChannelCreate';
import { ChannelRequest } from '@/types/channel.type';
import { DEFAULT_CHANNEL_VALUES } from '@/constants/config';
import validateChannel from '@/validations/validateChannel';

interface UseChannelCreateDialogProps {
  open: boolean;
  onSuccess: () => void;
}

export const useChannelCreateDialog = ({ open, onSuccess }: UseChannelCreateDialogProps) => {
  const { mutate: createChannel, isPending } = useCreateChannel();
  
  const {
    values,
    errors,
    handler,
    isValid,
    reset,
  } = useForm<ChannelRequest>(DEFAULT_CHANNEL_VALUES, validateChannel);

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const handleSubmit = async (data: ChannelRequest) => {
    if (!isValid) {
      console.log("Form is not valid.");
      return;
    }

    createChannel(data, {
      onSuccess: () => {
        onSuccess(); 
        reset(); 
      },
      onError: (error) => {
        console.error("Failed to create channel:", error);
      }
    });
  };

  return {
    formValues: values,
    formErrors: errors,
    formHandler: handler,
    isFormValid: isValid,
    isSubmitting: isPending,
    handleSubmit,
  };
};