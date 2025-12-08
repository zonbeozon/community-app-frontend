import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { useDeleteComment } from '@/hooks/comment/useDeleteComment';
import type { CommentDialogProps } from '@/types/comment.type';
import * as S from './CommentDeleteDialog.styles';

export const CommentDeleteDialog = ({ open, onOpenChange, comment }: CommentDialogProps) => {
  const { mutateAsync: deleteComment, isPending } = useDeleteComment();

  const { postId: postIdFromParams } = useParams<{ postId: string }>();
  const numericPostId = Number(postIdFromParams);

  const handleDeleteComment = async () => {
    if (isNaN(numericPostId)) {
      console.error('Post ID가 유효하지 않습니다.');
      return;
    }

    try {
      await deleteComment({
        postId: numericPostId,
        commentId: comment.commentId,
      });
      onOpenChange(false);
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <h3 className={S.title}>댓글 삭제</h3>
        </DialogHeader>
        <p className={S.message}>정말로 이 댓글을 삭제하시겠습니까?</p>
        <DialogFooter className={S.footer}>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            취소
          </Button>
          <Button variant="destructive" onClick={handleDeleteComment} disabled={isPending}>
            {isPending ? '삭제 중...' : '삭제'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
