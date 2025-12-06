import { useEffect } from 'react';
import { ChannelForm } from '@/components/channel/ChannelForm/ChannelForm';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useUpdateChannel } from '@/hooks/channel/useChannelUpdate';
import { useForm } from '@/hooks/common/useForm';
import { DEFAULT_CHANNEL_VALUES } from '@/constants/constants';
import { validateChannel } from '@/validations/validateChannel';
import type { ChannelDialogProps, ChannelRequest } from '@/types/channel.type';
import * as S from './ChannelUpdateDialog.styles';

export const ChannelUpdateDialog = ({ open, onOpenChange, channel }: ChannelDialogProps) => {
  const { values, errors, handler, isValid, reset, setValues } = useForm<ChannelRequest>(
    DEFAULT_CHANNEL_VALUES,
    validateChannel,
  );

  const { updateChannel, isUpdating } = useUpdateChannel();

  useEffect(() => {
    if (open && channel) {
      setValues({
        title: channel.channelInfo.title,
        description: channel.channelInfo.description,
        settings: {
          ...DEFAULT_CHANNEL_VALUES.settings,
          ...channel.channelInfo.settings,
        },
        imageId: channel.channelInfo.profile?.imageId ?? null,
      });
    }
  }, [open, channel, setValues]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
    }
    onOpenChange(isOpen);
  };

  const handleSubmit = async () => {
    if (!isValid || !channel) return;

    updateChannel(
      {
        channelId: channel.channelInfo.channelId,
        payload: { ...values },
      },
      {
        onSuccess: () => {
          handleOpenChange(false);
        },
      },
    );
  };

  if (!channel) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={S.dialog}>
        <DialogTitle className="sr-only">채널 정보 수정</DialogTitle>
        <DialogDescription className="sr-only">
          채널의 이름, 설명, 프로필 이미지 등 상세 정보를 수정하는 양식입니다.
        </DialogDescription>

        <ChannelForm
          content={values}
          errors={errors}
          handler={handler}
          imagePreview={channel.channelInfo.profile?.imageUrl ?? null}
          isEdit={true}
          isValid={isValid}
          isSubmitting={isUpdating}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
