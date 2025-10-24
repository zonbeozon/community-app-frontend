import { useEffect } from "react";
import { useAtomValue } from "jotai";
import useCreatePost from "@/hooks/post/useCreatePost";
import useForm from "@/hooks/common/useForm";
import validatePost from "@/validations/validatePost";
import { selectedChannelIdAtom } from "@/atoms/channelAtoms";
import { PostRequest } from "@/types/post.type";
import { DEFAULT_POST_VALUES } from "@/constants/constants";

interface UsePostCreateDialogProps {
    open: boolean;
    onSuccess: () => void;
  }

export const usePostCreateDialog = ({ open, onSuccess }: UsePostCreateDialogProps) => {
  const selectedChannelId = useAtomValue(selectedChannelIdAtom);
  const { mutate: createPost, isPending } = useCreatePost();

  const {
    values,
    errors,
    handler,
    isValid,
    reset
  } = useForm<PostRequest>(DEFAULT_POST_VALUES, validatePost);

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const handleSubmit = (data: PostRequest) => {
    if (!isValid || !selectedChannelId) return;

    createPost(  { channelId: selectedChannelId, payload: data }, {
        onSuccess: () => {
          onSuccess(); 
          reset(); 
        },
        onError: (error) => {
          console.error("Failed to create channel:", error);
        }
      });
  };

  return {
    formValues: values,
    formErrors: errors,
    formHandler: handler,
    isFormValid: isValid,
    isSubmitting: isPending,
    handleSubmit,
  };
};