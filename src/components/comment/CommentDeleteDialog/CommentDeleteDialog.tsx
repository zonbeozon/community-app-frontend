import { useParams } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CommentDialogProps } from "@/types/comment.type";
import useDeleteComment from '@/hooks/comment/useDeleteComment';
import * as S from "./CommentDeleteDialog.styles";

const CommentDeleteDialog = ({ open, onOpenChange, comment }: CommentDialogProps) => {
  const deleteCommentHandler = useDeleteComment();

  const { postId: postIdFromParams } = useParams<{ postId: string }>();
  const numericPostId = Number(postIdFromParams);

  const handleDeleteComment = async () => {
    if (isNaN(numericPostId)) {
        return;
    }
    await deleteCommentHandler(comment.commentId);
    onOpenChange(false); 
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><h3 className={S.title}>댓글 삭제</h3></DialogHeader>
        <p className={S.message}>정말로 이 댓글을 삭제하시겠습니까?</p>
        <DialogFooter className={S.footer}>
          <Button variant="outline" onClick={() => onOpenChange(false)}>취소</Button>
          <Button variant="destructive" onClick={handleDeleteComment}>삭제</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDeleteDialog;