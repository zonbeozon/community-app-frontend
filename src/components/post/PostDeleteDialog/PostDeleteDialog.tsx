import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PostDialogProps } from "@/types/post.type"; 
import useDeletePost from "@/hooks/post/useDeletePost";
import * as S from "./PostDeleteDialog.styles";

const PostDeleteDialog = ({ open, onOpenChange, post }: PostDialogProps) => {
  const deletePostHandler = useDeletePost();
  const postId = post.postId;

  const handleDeletePost = async () => {
    await deletePostHandler(postId);
    onOpenChange(false); 
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={S.title}>포스트 삭제</DialogTitle>
          <DialogDescription className={S.message}>
            정말로 이 포스트를 삭제하시겠습니까?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className={S.footer}>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button variant="destructive" onClick={handleDeletePost}>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostDeleteDialog;