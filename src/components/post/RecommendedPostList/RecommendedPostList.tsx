import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import useGetRecommendedPosts from "@/queries/useGetRecommendedPosts";
import PostItem from "@/components/post/PostItem/PostItem";
import ItemSkeleton from "@/components/common/ItemSkeleton/ItemSkeleton";
import { MESSAGES } from "@/constants/messages";
import * as S from "@/components/post/PostList/PostList.styles";
import { Sparkles } from "lucide-react";
import localizeTimezone from "@/utils/localizeTimezone";

const RecommendedPostList = () => {
  const navigate = useNavigate();
  const {
    data: posts,
    lastUpdated,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetRecommendedPosts();

  const { ref: inViewRef } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const handleClick = (channelId: number, postId: number) => {
    navigate(`/channels/${channelId}/posts/${postId}`);
  };

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, i) => (
          <ItemSkeleton key={i} />
        ))}
      </>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className={S.statusContainer}>
        <p className={S.emptyMessage}>{MESSAGES.NO_POSTS_WRITTEN}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-800">추천 포스트</h2>
          </div>

          <span className="text-xs text-gray-500">
            마지막 업데이트: {localizeTimezone(lastUpdated)}
          </span>
        </div>
      </div>

      <div
        id="main-content"
        className="overflow-y-auto h-full flex flex-col gap-2"
      >
        {posts.map((post) => (
          <PostItem
            channelId={0}
            key={post.postId}
            post={post}
            author={post.author}
            onCommentClick={null}
            hideActions={true}
          />
        ))}
        {hasNextPage && <div ref={inViewRef} style={{ height: "1px" }} />}
      </div>
    </>
  );
};

export default RecommendedPostList;
