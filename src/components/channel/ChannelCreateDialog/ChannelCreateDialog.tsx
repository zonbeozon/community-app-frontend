import { PlusIcon } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ChannelForm from "@/components/channel/ChannelForm/ChannelForm";
import { useChannelCreateDialog } from "@/hooks/channel/channeldialog/useChannelCreateDialog";
import { DialogProps } from "@/types/common.type";
import * as S from "./ChannelCreateDialog.styles";

const ChannelCreateDialog = ({ open, onOpenChange }: DialogProps) => {
  const {
    formValues,
    formErrors,
    formHandler,
    isFormValid,
    isSubmitting,
    handleSubmit,
  } = useChannelCreateDialog({
    open,
    onSuccess: () => onOpenChange(false), 
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className={S.createButton}>
          <PlusIcon size={16}/>
          새 채널 만들기
        </Button>
      </DialogTrigger>

      <DialogContent className={S.dialog}>
        <DialogTitle className="sr-only">새 채널 만들기</DialogTitle>
        <DialogDescription className="sr-only">
          새로운 채널을 만들기 위한 양식입니다. 채널 이름, 설명, 프로필 이미지를 설정하고 '생성하기' 버튼을 누르세요.
        </DialogDescription>

        <ChannelForm
          content={formValues}
          errors={formErrors}
          handler={formHandler}
          imagePreview={null} 
          isEdit={false}
          isValid={isFormValid}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChannelCreateDialog;