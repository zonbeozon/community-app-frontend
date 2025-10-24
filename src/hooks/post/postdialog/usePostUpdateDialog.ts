import { useEffect } from "react";
import useUpdatePost from "@/hooks/post/useUpdatePost";
import useForm from "@/hooks/common/useForm";
import validatePost from "@/validations/validatePost";
import type { Post, PostRequest } from "@/types/post.type";

interface UsePostUpdateDialogProps {
  post: Post;
  open: boolean;
  onSuccess: () => void;
  channelId?: number;
}

export const usePostUpdateDialog = ({ post, open, onSuccess, channelId }: UsePostUpdateDialogProps) => {
  const { mutate: updatePost, isPending } = useUpdatePost();

  const {
    values,
    errors,
    handler,
    isValid,
    reset,
  } = useForm<PostRequest>(
    {
      content: post.content,
      imageIds: post.images ? post.images.map(image => image.imageId) : [],
    },
    validatePost
  );

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const handleSubmit = (data: PostRequest) => {
    if (typeof channelId !== 'number') {
      console.error("useUpdatePostDialog: channelId is required but was not provided.");
      return;
    }
    
    if (!isValid) return;

    updatePost({ 
      postId: post.postId,
      channelId: channelId,
      payload: data 
    }, {
        onSuccess: () => {
          onSuccess();
          reset();
        },
        onError: (error) => {
          console.error("Failed to update post:", error);
        }
      }
    );
  };

  return {
    formValues: values,
    formErrors: errors,
    formHandler: handler,
    isFormValid: isValid,
    isSubmitting: isPending,
    handleSubmit,
    imagePreview: post.images ? post.images.map(image => image.imageUrl) : [],
  };
};