import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useGetComments } from '@/queries/useGetComments';
import useGetPost from '@/queries/useGetPost';
import { useCommentSubscription } from '@/stomp/hooks/useCommentSubscription';
import { toast } from 'sonner';
import { CommentInput } from '@/components/comment/CommentInput/CommentInput';
import { CommentList } from '@/components/comment/CommentList/CommentList';
import { ItemSkeleton } from '@/components/common/ItemSkeleton/ItemSkeleton';
import { PostItem } from '@/components/post/PostItem/PostItem';
import { useChannelLogic } from '@/hooks/channel/useChannelLogic';
import { useCreateComment } from '@/hooks/comment/useCreateComment';
import { ROUTE_PATH } from '@/constants/routePaths';
import * as S from './PostDetail.styles';

const PostDetail = () => {
  const { channelId, postId } = useParams<{
    channelId: string;
    postId: string;
  }>();
  const navigate = useNavigate();
  const { channelData } = useChannelLogic();

  const numericChannelId = Number(channelId || 0);
  const numericPostId = Number(postId || 0);

  const { data: postData, isLoading: isLoadingPost, isError: isErrorPost } = useGetPost(numericPostId, numericChannelId);
  const { data: commentsData } = useGetComments(numericPostId);
  const { mutate: createComment } = useCreateComment();

  useCommentSubscription(numericPostId);

  const handleCommentSubmit = (content: string) => {
    if (!content.trim()) return;
    console.log(channelData);
    createComment({ postId: numericPostId, content });
  };

  useEffect(() => {
    if (!channelData) return;

    const { settings } = channelData.channelInfo;
    const isJoined = channelData.membership;

    if (settings.contentVisibility === 'PRIVATE' && !isJoined) {
      navigate(ROUTE_PATH.main);
      toast.error('해당 채널은 비공개 채널입니다.');
    }
  }, [channelData, navigate]);

  if (isLoadingPost) {
    return (
      <div className={S.wrapper}>
        <ItemSkeleton />
      </div>
    );
  }

  if (isErrorPost || !postData) {
    return <div className={S.wrapper}>게시글을 찾을 수 없습니다.</div>;
  }

  const { post, author } = postData;

  const commentCount = commentsData?.comments.length ?? post.metric.commentCount;

  return (
    <div className={S.wrapper}>
      <div className={S.scrollableArea}>
        <PostItem post={post} author={author} channelId={numericChannelId} onCommentClick={() => {}} hideActions={false} />
        <div className={S.commentSection.wrapper}>
          <h2 className={S.commentSection.title}>댓글 ({commentCount})</h2>
          <CommentList postId={numericPostId} channelId={numericChannelId} />
        </div>
      </div>
      <div className={S.inputContainer}>
        <CommentInput onSubmit={handleCommentSubmit} />
      </div>
    </div>
  );
};

export default PostDetail;