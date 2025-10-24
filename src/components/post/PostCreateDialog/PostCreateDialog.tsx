import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import PostForm from "../PostForm/PostForm";
import { usePostCreateDialog } from "@/hooks/post/postdialog/usePostCreateDialog";
import { PlusIcon } from "lucide-react";
import * as S from "./PostCreateDialog.styles";
import { DialogProps } from "@/types/common.type";
import { Button } from "@/components/ui/button";

const PostCreateDialog = ({ open, onOpenChange }: DialogProps) => {
  const {
    formValues,
    formErrors,
    formHandler,
    isFormValid,
    isSubmitting,
    handleSubmit,
  } = usePostCreateDialog({
    open,
    onSuccess: () => onOpenChange(false), 
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className={S.createButton}>
          <PlusIcon size={16} />
          새 포스트 생성하기
        </Button>
      </DialogTrigger>

      <DialogContent className={S.dialog}>
        <DialogTitle className={S.srOnly}>새 포스트 생성</DialogTitle>
        <DialogDescription className={S.srOnly}>
          현재 채널에 공유할 새로운 포스트를 작성합니다. 내용, 이미지를 추가하고 '생성하기' 버튼을 누르세요.
        </DialogDescription>

        <PostForm
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

export default PostCreateDialog;