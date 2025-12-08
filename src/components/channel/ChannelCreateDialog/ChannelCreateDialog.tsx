import { PlusIcon } from 'lucide-react';
import { ChannelForm } from '@/components/channel/ChannelForm/ChannelForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useChannelCreate } from '@/hooks/channel/useCreateChannel';
import { useForm } from '@/hooks/common/useForm';
import { DEFAULT_CHANNEL_VALUES } from '@/constants/constants';
import { validateChannel } from '@/validations/validateChannel';
import type { ChannelDialogProps, ChannelPayload } from '@/types/channel.type';
import * as S from './ChannelCreateDialog.styles';

export const ChannelCreateDialog = ({ open, onOpenChange }: ChannelDialogProps) => {
  const { values, errors, handler, isValid, reset } = useForm<ChannelPayload>(DEFAULT_CHANNEL_VALUES, validateChannel);

  const { createChannel, isCreating } = useChannelCreate();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
    }
    onOpenChange(isOpen);
  };

  const handleSubmit = async () => {
    if (!isValid) return;

    createChannel(values, {
      onSuccess: () => {
        handleOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className={S.createButton}>
          <PlusIcon size={16} />새 채널 만들기
        </Button>
      </DialogTrigger>

      <DialogContent className={S.dialog}>
        <DialogTitle className={S.srOnly}>새 채널 만들기</DialogTitle>
        <DialogDescription className={S.srOnly}>
          새로운 채널을 만들기 위한 양식입니다. 채널 이름, 설명, 프로필 이미지를 설정하고 '생성하기' 버튼을 누르세요.
        </DialogDescription>

        <ChannelForm
          content={values}
          errors={errors}
          handler={handler}
          imagePreview={null}
          isEdit={false}
          isValid={isValid}
          isSubmitting={isCreating}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
