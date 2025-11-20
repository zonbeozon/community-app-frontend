import { useParams } from 'react-router-dom';
import useGetPost from '@/queries/useGetPost';
import useGetComments from '@/queries/useGetComments';
import useCreateComment from '@/hooks/comment/useCreateComment';
import { useCommentSubscription } from '@/stomp/hooks/useCommentSubscription';
import PostItem from '@/components/post/PostItem/PostItem';
import CommentList from '@/components/comment/CommentList/CommentList';
import CommentInput from '@/components/comment/CommentInput/CommentInput';
import ItemSkeleton from '@/components/common/ItemSkeleton/ItemSkeleton';
import * as S from './PostDetail.styles';

const PostDetail = () => {
  const { channelId, postId } = useParams<{ channelId: string; postId: string }>();
  
  const numericChannelId = Number(channelId || 0);
  const numericPostId = Number(postId || 0);

  const { data: postData, isLoading: isLoadingPost, isError: isErrorPost } = useGetPost(numericPostId, numericChannelId);
  const { data: commentsData } = useGetComments(numericPostId);
  const { mutate: createComment, isPending: isCreatingComment } = useCreateComment();
  
  useCommentSubscription(numericPostId);

  const handleCommentSubmit = (content: string) => {
    if (!content.trim()) return; 
    createComment({ postId: numericPostId, content });
  };

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
        <PostItem 
          post={post}
          author={author}
          channelId={numericChannelId} 
          onCommentClick={() => {}} 
        />
        <div className={S.commentSection.wrapper}>
          <h2 className={S.commentSection.title}>댓글 ({commentCount})</h2>
          <CommentList postId={numericPostId} channelId={numericChannelId} />
        </div>
      </div>
      <div className={S.inputContainer}>
        <CommentInput onSubmit={handleCommentSubmit}  />
      </div>
    </div>
  );
};

export default PostDetail;