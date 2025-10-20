import { useAtomValue } from "jotai";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import PostForm from "../PostForm/PostForm";
import useCreatePost from "@/hooks/post/useCreatePost";
import useForm from "@/hooks/common/useForm";
import validatePost from "@/validations/validatePost";
import { selectedChannelIdAtom } from "@/atoms/channelAtoms";
import { PostRequest } from "@/types/post.type";
import { PlusIcon } from "lucide-react";
import { DEFAULT_POST_VALUES } from "@/constants/config";
import * as S from "./PostCreateDialog.styles";

interface PostCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PostCreateDialog = ({ open, onOpenChange }: PostCreateDialogProps) => {
  const selectedChannelId = useAtomValue(selectedChannelIdAtom);
  const { mutate: createPost } = useCreatePost();

  const {
    values,
    errors,
    handler,
    reset,
    isValid,
  } = useForm<PostRequest & { previewUrls?: string[] }>(
    DEFAULT_POST_VALUES,
    validatePost
  );

  const handlePost = (data: PostRequest) => {
    if (!isValid || !selectedChannelId) return;

    createPost({ channelId: selectedChannelId, payload: data }, {
      onSuccess: () => {
        onOpenChange(false);
        reset();
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpenState) => {
        onOpenChange(newOpenState);
        if (newOpenState) {
          reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <button className={S.createButton}>
          <PlusIcon size={16} />
          새 포스트 생성하기
        </button>
      </DialogTrigger>

      <DialogContent className={S.dialog}>
        <DialogTitle className="sr-only">새 포스트 생성</DialogTitle>
        <DialogDescription className="sr-only">
          현재 채널에 공유할 새로운 포스트를 작성합니다. 내용, 이미지를 추가하고 '생성하기' 버튼을 누르세요.
        </DialogDescription>

        <PostForm
          content={values}
          errors={errors}
          handler={handler}
          imagePreview={values.previewUrls ?? []}
          isEdit={false}
          isValid={isValid}
          onSubmit={handlePost}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PostCreateDialog;