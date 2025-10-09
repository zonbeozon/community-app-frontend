import { useEffect } from "react";
import useUpdatePost from "@/hooks/post/useUpdatePost";
import useForm from "@/hooks/common/useForm";
import validatePost from "@/validations/validatePost";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { PostDialogProps, PostRequest } from "@/types/post.type";
import PostForm from "../PostForm/PostForm";
import * as S from "./PostUpdateDialog.styles";

const PostUpdateDialog = ({ open, onOpenChange, post }: PostDialogProps) => {
  const updatePostHandler = useUpdatePost();

  if (!post) {
    return null;
  }

  const postId = post.postId;

  const initialPostState: PostRequest = {
    imageIds: post.images ? post.images.map(img => img.imageId).filter(Boolean) as number[] : [],
    content: post.content,
  };

  const {
    values,
    errors,
    handler,
    reset,
    isValid,
    setValues,
  } = useForm<PostRequest & { previewUrls?: [] }>(
    initialPostState,
    validatePost,
  );

  useEffect(() => {
    if (open && post) {
      setValues({
        imageIds: post.images ? post.images.map(img => img.imageId).filter(Boolean) as number[] : [],
        content: post.content,
      });
    }
  }, [open, post, setValues]);

  const handlePatch = async () => {
    if (!isValid) return;

    await updatePostHandler(postId, values);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        onOpenChange(newOpen);
        if (!newOpen) {
          reset();
        }
      }}
    >
      <DialogContent className={S.dialogContent}>
        <DialogTitle className="sr-only">포스트 수정</DialogTitle>
        <DialogDescription className="sr-only">
          기존 포스트의 내용과 이미지를 수정하는 양식입니다.
        </DialogDescription>
        
        <PostForm
          content={values}
          errors={errors}
          handler={handler}
          imagePreview={post.images ? post.images.map(img => img.imageUrl).filter(Boolean) as string[] : []}
          isEdit={true}
          isValid={isValid}
          onSubmit={handlePatch}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PostUpdateDialog;