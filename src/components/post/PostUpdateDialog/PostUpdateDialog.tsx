import { usePostUpdateDialog } from "@/hooks/post/postdialog/usePostUpdateDialog";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PostDialogProps } from "@/types/post.type";
import PostForm from "../PostForm/PostForm";
import * as S from "./PostUpdateDialog.styles";

const PostUpdateDialog = ({ open, onOpenChange, post, channelId }: PostDialogProps) => {
  const {
    formValues,
    formErrors,
    formHandler,
    isFormValid,
    isSubmitting,
    handleSubmit,
    imagePreview,
  } = usePostUpdateDialog({
    open,
    post,
    channelId,
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={S.dialog}>
        <DialogTitle className={S.srOnly}>포스트 수정</DialogTitle>
        <DialogDescription className={S.srOnly}>
          기존 포스트의 내용과 이미지를 수정하는 양식입니다.
        </DialogDescription>
        
        <PostForm
          content={formValues}
          errors={formErrors}
          handler={formHandler}
          imagePreview={imagePreview}
          isEdit={true}
          isValid={isFormValid}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PostUpdateDialog;