import { useParams } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import { PostForm } from '@/components/post/PostForm/PostForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from '@/hooks/common/useForm';
import { useCreatePost } from '@/hooks/post/useCreatePost';
import { DEFAULT_POST_VALUES } from '@/constants/constants';
import { validatePost } from '@/validations/validatePost';
import type { DialogProps } from '@/types/common.type';
import type { PostPayload } from '@/types/post.type';
import * as S from './PostCreateDialog.styles';

export const PostCreateDialog = ({ open, onOpenChange }: DialogProps) => {
  const { channelId } = useParams();
  const { values, errors, handler, isValid, reset } = useForm<PostPayload>(DEFAULT_POST_VALUES, validatePost);

  const { mutate: createPost, isPending } = useCreatePost();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
    }
    onOpenChange(isOpen);
  };

  const handleSubmit = async () => {
    if (!isValid || !channelId) return;

    createPost(
      {
        channelId: Number(channelId),
        payload: values,
      },
      {
        onSuccess: () => {
          handleOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className={S.createButton}>
          <PlusIcon size={16} />새 포스트 생성하기
        </Button>
      </DialogTrigger>

      <DialogContent className={S.dialog}>
        <DialogTitle className={S.srOnly}>새 포스트 생성</DialogTitle>
        <DialogDescription className={S.srOnly}>
          현재 채널에 공유할 새로운 포스트를 작성합니다. 내용, 이미지를 추가하고 '생성하기' 버튼을 누르세요.
        </DialogDescription>

        <PostForm
          content={values}
          errors={errors}
          handler={handler}
          isEdit={false}
          isValid={isValid}
          isSubmitting={isPending}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
