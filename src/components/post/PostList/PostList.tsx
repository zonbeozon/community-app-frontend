import { useLayoutEffect, useRef, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';
import { useSetAtom } from 'jotai';

import useInfinitePosts from '@/hooks/post/useInfinitePosts';
import useGetJoinedChannels from '@/queries/useGetJoinedChannel';
import { selectedPostIdAtom } from '@/atoms/postAtoms';

import PostItem from '../PostItem/PostItem';
import ItemSkeleton from '@/components/common/ItemSkeleton/ItemSkeleton';
import { MESSAGES } from '@/constants/message';
import * as S from './PostList.styles';

const SCROLL_POSITION_KEY = 'post_list_scroll_position';

const PostList = () => {
  const navigate = useNavigate();
  const { channelId } = useParams<{ channelId: string }>();
  const numericChannelId = Number(channelId);

  const setSelectedPostId = useSetAtom(selectedPostIdAtom);
  const { data: myChannels, isLoading: isLoadingChannels } = useGetJoinedChannels();

  const currentChannel = useMemo(() => {
    if (!myChannels) return null;
    return myChannels.find(c => c.channelInfo.channelId === numericChannelId);
  }, [myChannels, numericChannelId]);

  const canViewChannel = useMemo(() => {
    if (isLoadingChannels || !currentChannel) return false;
    if (currentChannel.channelInfo.settings.contentVisibility === "PRIVATE" && !currentChannel.membership) {
      return false;
    }
    return true;
  }, [isLoadingChannels, currentChannel]);
  
  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingPosts,
  } = useInfinitePosts(numericChannelId, {
    enabled: !!numericChannelId && canViewChannel,
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
        sessionStorage.setItem(
          `${SCROLL_POSITION_KEY}_${numericChannelId}`,
          parentScroller.scrollTop.toString()
        );
        throttleTimer = null;
      }, 200);
    };

    parentScroller.addEventListener('scroll', handleScroll);
    return () => {
      parentScroller.removeEventListener('scroll', handleScroll);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [numericChannelId]);

  // 수정된 코드
const handleCommentClick = (postId: number) => {
  setSelectedPostId(postId);
  // 경로 맨 앞에 슬래시(/)를 추가하여 절대 경로로 만듭니다.
  navigate(`/channels/${numericChannelId}/posts/${postId}`);
};

  if (isLoadingChannels) {
  return <>{Array.from({ length: 5 }).map((_, i) => <ItemSkeleton key={i} />)}</>;
}

if (!canViewChannel) {
  return (
    <div className={S.statusContainer}>
      <p className={S.emptyMessage}>🔒 비공개 채널이거나 접근할 수 없습니다.</p>
    </div>
  );
}

if (isLoadingPosts || !postsData) { 
  return <>{Array.from({ length: 5 }).map((_, i) => <ItemSkeleton key={i} />)}</>;
}

  
  const posts = postsData?.posts || [];
  const authors = postsData?.authors || {};

  console.log(authors)

  if (posts.length === 0) {
    return (
      <div className={S.statusContainer}>
        <p className={S.emptyMessage}>{MESSAGES.NO_POSTS_WRITTEN}</p>
      </div>
    );
  }

  return (
    <>
      <div ref={scrollRef} id="main-content" style={{ overflowY: 'auto', height: '100%' }}>
        {posts.map((post) => {
  // 디버깅을 위해 map 내부에서 로그를 찍어봅니다.
  console.log(`Trying to find author for authorId: ${post.authorId} (type: ${typeof post.authorId})`);
  const authorInfo = authors[String(post.authorId)]; // authorId를 문자열로 변환!
  console.log('Found author info:', authorInfo);

  return (
    <PostItem
      channelId={numericChannelId}
      key={post.postId} 
      post={post}
      // String()으로 감싸서 키 타입을 일치시킵니다.
      author={authors[String(post.authorId)] ?? { memberId: 0, username: "알 수 없는 사용자", profile: null, serverRole: "USER", channelRole: "NONE" }} 
      onCommentClick={handleCommentClick} 
    />
  );
})}

        {hasNextPage && !isFetchingNextPage && (
          <div ref={inViewRef} style={{ height: '1px' }} />
        )}
        
        {isFetchingNextPage && (
          <div className={S.loadingMoreContainer}>
            <Loader2 className={S.loadingMoreIcon} size={S.loadingMoreIconSize} />
          </div>
        )}
      </div>
    </>
  );
};

export default PostList;