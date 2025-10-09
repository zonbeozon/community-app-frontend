import { useEffect, useMemo } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import useGetJoinedChannels from '@/queries/useGetJoinedChannel';
import useUpdateChannel from '@/hooks/channel/useUpdateChannel';
import useForm from "@/hooks/common/useForm";
import validateChannel from "@/validations/validateChannel";
import ChannelForm from "@/components/channel/ChannelForm/ChannelForm";
import { DEFAULT_CHANNEL_VALUES } from "@/constants/config";
import { ChannelDialogProps, ChannelRequest } from "@/types/channel.type";
import * as S from "./ChannelUpdateDialog.styles";

const ChannelUpdateDialog = ({ open, onOpenChange, channelId }: ChannelDialogProps) => {
  const { mutate: updateChannel, isPending } = useUpdateChannel();
  const { data: myChannels } = useGetJoinedChannels();

  const channel = useMemo(() => {
    return myChannels?.find(c => c.channelInfo.channelId === channelId);
  }, [myChannels, channelId]);

  const { values, errors, handler, isValid, reset, setValues } = useForm<ChannelRequest & { previewUrl?: string }>(
    DEFAULT_CHANNEL_VALUES,
    validateChannel,
  );

  useEffect(() => {
    if (open && channel) {
      setValues({
        title: channel.channelInfo.title,
        description: channel.channelInfo.description,
        imageId: channel.channelInfo.profile?.imageId || null,
        channelType: channel.channelInfo.channelType,
        settings: {
          ...DEFAULT_CHANNEL_VALUES.settings,
          ...channel.channelInfo.settings,         
        },
        previewUrl: channel.channelInfo.profile?.imageUrl,
      });
    }
  }, [open, channel, setValues]);

  if (!channel) return null;

  const handlePatch = (data: ChannelRequest) => {
    updateChannel({ channelId, payload: data }, {
      onSuccess: () => {
        onOpenChange(false);
        reset();
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={S.dialog}>
        <DialogTitle className="sr-only">채널 정보 수정</DialogTitle>
        <DialogDescription className="sr-only">
          채널의 이름, 설명, 프로필 이미지 등 상세 정보를 수정하는 양식입니다.
        </DialogDescription>
        
        <ChannelForm
          content={values}
          errors={errors}
          handler={handler}
          imagePreview={values.previewUrl || ""}
          isEdit={true}
          isValid={isValid}
          onSubmit={handlePatch}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChannelUpdateDialog;