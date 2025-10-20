import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useChannelUpdateDialog } from "@/hooks/channel/channeldialog/useChannelUpdateDialog";
import ChannelForm from "@/components/channel/ChannelForm/ChannelForm";
import { ChannelDialogProps } from "@/types/channel.type";
import * as S from "./ChannelUpdateDialog.styles";

const ChannelUpdateDialog = ({ open, onOpenChange, channelId }: ChannelDialogProps) => {
  const {
    formValues,
    formErrors,
    formHandler,
    isFormValid,
    isSubmitting,
    submitForm,
  } = useChannelUpdateDialog({
    open,
    channelId,
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={S.dialog}>
        <DialogTitle className="sr-only">채널 정보 수정</DialogTitle>
        <DialogDescription className="sr-only">
          채널의 이름, 설명, 프로필 이미지 등 상세 정보를 수정하는 양식입니다.
        </DialogDescription>
        
        <ChannelForm
          content={formValues}
          errors={formErrors}
          handler={formHandler}
          imagePreview={formValues.previewUrl || null}
          isEdit={true}
          isValid={isFormValid}
          isSubmitting={isSubmitting}
          onSubmit={submitForm}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChannelUpdateDialog;