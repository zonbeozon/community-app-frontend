import { useEffect } from 'react';
import { PostForm } from '@/components/post/PostForm/PostForm';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@/hooks/common/useForm';
import { useUpdatePost } from '@/hooks/post/useUpdatePost';
import { DEFAULT_POST_VALUES } from '@/constants/constants';
import { validatePost } from '@/validations/validatePost';
import type { PostDialogProps, PostPayload } from '@/types/post.type';
import * as S from './PostUpdateDialog.styles';

export const PostUpdateDialog = ({ open, onOpenChange, post, channelId }: PostDialogProps) => {
  const {
    values,
    errors,
    handler,
    isValid,
    reset,
    setValues,
    handleSubmit,
    isSubmitting: isFormSubmitting,
  } = useForm<PostPayload>(DEFAULT_POST_VALUES, validatePost);

  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();

  useEffect(() => {
    if (open && post) {
      setValues({
        content: post.content,
        imageIds: post.images?.map((img) => img.imageId) ?? [],
      });
    } else if (!open) {
      reset();
    }
  }, [open, post, setValues, reset]);

  const onSubmit = handleSubmit(async (submitValues) => {
    if (!channelId) return;

    updatePost(
      {
        postId: post.postId,
        channelId: channelId,
        payload: submitValues,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={S.dialog}>
        <DialogTitle className={S.srOnly}>포스트 수정</DialogTitle>
        <DialogDescription className={S.srOnly}>기존 포스트의 내용과 이미지를 수정하는 양식입니다.</DialogDescription>

        <PostForm
          content={values}
          errors={errors}
          handler={handler}
          isEdit={true}
          isValid={isValid}
          isSubmitting={isUpdating || isFormSubmitting}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
