import { useEffect, useLayoutEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate, useParams } from 'react-router-dom';
import { selectedPostIdAtom } from '@/atoms/postAtoms';
import { usePostSubscription } from '@/stomp/hooks/usePostSubscriptions';
import { useSetAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ItemSkeleton } from '@/components/common/ItemSkeleton/ItemSkeleton';
import { useChannelLogic } from '@/hooks/channel/useChannelLogic';
import { useInfinitePosts } from '@/hooks/post/useInfinitePosts';
import { useUpdateLatestPost } from '@/hooks/post/useSetLatestPost';
import { MESSAGES } from '@/constants/messages';
import { ROUTE_PATH } from '@/constants/routePaths';
import { PostItem } from '../PostItem/PostItem';
import * as S from './PostList.styles';

const SCROLL_POSITION_KEY = 'post_list_scroll_position';

export const PostList = () => {
  const { channelData } = useChannelLogic();
  const navigate = useNavigate();
  const { channelId } = useParams<{ channelId: string }>();
  const numericChannelId = Number(channelId);

  const setSelectedPostId = useSetAtom(selectedPostIdAtom);
  const updateLatestPost = useUpdateLatestPost();

  usePostSubscription(numericChannelId);

  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingPosts,
  } = useInfinitePosts(numericChannelId, {
    enabled: !!numericChannelId,
  });

  const { ref: inViewRef } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!channelData) return;

    const { settings } = channelData.channelInfo;
    const isJoined = channelData.membership;

    if (settings.contentVisibility === 'PRIVATE' && !isJoined) {
      navigate(ROUTE_PATH.main);
      toast.error('해당 채널은 비공개 채널입니다.');
    }
  }, [channelData, navigate]);

  useEffect(() => {
    if (postsData?.posts?.length) {
      updateLatestPost(numericChannelId, postsData.posts[0]);
    } else {
      updateLatestPost(numericChannelId, null);
    }
  }, [postsData, numericChannelId, updateLatestPost]);

  useLayoutEffect(() => {
    const parentScroller = scrollRef.current;
    if (!parentScroller) return;

    const savedPosition = sessionStorage.getItem(`${SCROLL_POSITION_KEY}_${numericChannelId}`);
    if (savedPosition !== null) {
      parentScroller.scrollTop = parseInt(savedPosition, 10);
    }

    let throttleTimer: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      if (throttleTimer) return;
      throttleTimer = setTimeout(() => {
        sessionStorage.setItem(`${SCROLL_POSITION_KEY}_${numericChannelId}`, parentScroller.scrollTop.toString());
        throttleTimer = null;
      }, 200);
    };

    parentScroller.addEventListener('scroll', handleScroll);
    return () => {
      parentScroller.removeEventListener('scroll', handleScroll);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [numericChannelId]);

  const handleCommentClick = (postId: number) => {
    setSelectedPostId(postId);
    navigate(`/channels/${numericChannelId}/posts/${postId}`);
  };

  if (isLoadingPosts || !postsData) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, i) => (
          <ItemSkeleton key={i} />
        ))}
      </>
    );
  }

  const posts = postsData.posts || [];
  const authors = postsData.authors || {};

  if (posts.length === 0) {
    return (
      <div className={S.statusContainer}>
        <p className={S.emptyMessage}>{MESSAGES.NO_POSTS_WRITTEN}</p>
      </div>
    );
  }

  return (
    <div ref={scrollRef} id="main-content" style={{ overflowY: 'auto', height: '100%' }}>
      {posts.map((post) => {
        const authorInfo = authors[post.authorId];
        return (
          <PostItem
            channelId={numericChannelId}
            key={post.postId}
            post={post}
            author={authorInfo}
            onCommentClick={handleCommentClick}
            hideActions={false}
          />
        );
      })}

      {hasNextPage && !isFetchingNextPage && <div ref={inViewRef} style={{ height: '1px' }} />}

      {isFetchingNextPage && (
        <div className={S.loadingMoreContainer}>
          <Loader2 className={S.loadingMoreIcon} size={S.loadingMoreIconSize} />
        </div>
      )}
    </div>
  );
};
