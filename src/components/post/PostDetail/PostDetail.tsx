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
  // 1. URL 파라미터에서 channelId와 postId를 가져옵니다.
  const { channelId, postId } = useParams<{ channelId: string; postId: string }>();
  
  // 2. 숫자 타입으로 변환합니다. channelId가 undefined일 경우를 대비해 0을 기본값으로 설정할 수 있습니다.
  const numericChannelId = Number(channelId || 0);
  const numericPostId = Number(postId || 0);

  // 3. 수정된 useGetPost 훅에 postId와 channelId를 모두 전달합니다.
  const { data: postData, isLoading: isLoadingPost, isError: isErrorPost } = useGetPost(numericPostId, numericChannelId);
  
  const { data: commentsData } = useGetComments(numericPostId);
  const { mutate: createComment, isPending: isCreatingComment } = useCreateComment();
  
  // 4. 웹소켓 구독을 설정합니다.
  useCommentSubscription(numericPostId);

  const handleCommentSubmit = (content: string) => {
    if (!content.trim()) return; // 내용이 없으면 제출 방지
    createComment({ postId: numericPostId, content });
  };

  // 5. 로딩 중일 때 스켈레톤 UI를 보여줍니다. (주로 새로고침 시 보임)
  if (isLoadingPost) {
    return (
      <div className={S.wrapper}>
        <ItemSkeleton />
      </div>
    );
  }

  // 6. 에러가 발생했거나, 로딩이 끝났는데도 데이터가 없는 경우 에러 메시지를 보여줍니다.
  if (isErrorPost || !postData) {
    return <div className={S.wrapper}>게시글을 찾을 수 없습니다.</div>;
  }

  // 7. 이제 postData는 항상 { post, author } 형태임이 보장됩니다.
  const { post, author } = postData;
  
  // 8. 댓글 수를 계산합니다. (실시간 댓글 데이터를 우선적으로 사용)
  const commentCount = commentsData?.comments.length ?? post.commentCount;

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