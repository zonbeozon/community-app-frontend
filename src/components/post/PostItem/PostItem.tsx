import { useEffect, useRef } from 'react';
import { serverMemberAtom } from '@/atoms/authAtoms';
import { useAtomValue } from 'jotai';
import { ChannelMemberInfoDialog } from '@/components/channelMember/ChannelMemberInfoDialog/ChannelMemberInfoDialog';
import { CommentButton } from '@/components/comment/CommentButton/CommentButton';
import { ItemSkeleton } from '@/components/common/ItemSkeleton/ItemSkeleton';
import { TimeDisplay } from '@/components/common/TimeDisplay/TimeDisplay';
import { ViewCount } from '@/components/common/ViewCount/ViewCount';
import { PostDropdown } from '@/components/post/PostDropdown/PostDropdown';
import { DislikeButton } from '@/components/reaction/DislikeButton/DislikeButton';
import { LikeButton } from '@/components/reaction/LikeButton/LikeButton';
import { ServerMemberInfoDialog } from '@/components/serverMember/ServerMemberInfoDialog/ServerMemberInfoDialog';
import useCreateReaction from '@/hooks/reaction/useCreateReaction';
import useDeleteReaction from '@/hooks/reaction/useDeleteReaction';
import { usePostViewLogger } from '@/hooks/viewLogger/usePostViewLogger';
import type { Image } from '@/types/common.type';
import type { PostItemProps } from '@/types/post.type';
import * as S from './PostItem.styles';

const VIEW_THRESHOLD_PERCENT = 0.5;
const VIEW_DEBOUNCE_TIME_MS = 500;

export const PostItem = ({ post, author, channelId, onCommentClick, onClick, hideActions }: PostItemProps) => {
  const myInfo = useAtomValue(serverMemberAtom);
  const { mutate: createReaction } = useCreateReaction();
  const { mutate: deleteReaction } = useDeleteReaction();
  const { logView } = usePostViewLogger();

  const itemRef = useRef<HTMLDivElement>(null);
  const viewTimer = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= VIEW_THRESHOLD_PERCENT) {
            if (!viewTimer.current) {
              viewTimer.current = setTimeout(() => {
                logView(post.postId);
                viewTimer.current = null;
                observer.unobserve(entry.target);
              }, VIEW_DEBOUNCE_TIME_MS);
            }
          } else {
            if (viewTimer.current) {
              clearTimeout(viewTimer.current);
              viewTimer.current = null;
            }
          }
        });
      },
      { threshold: VIEW_THRESHOLD_PERCENT },
    );

    const currentRef = itemRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      if (viewTimer.current) clearTimeout(viewTimer.current);
    };
  }, [post.postId, logView]);

  if (!post || !author) {
    console.log(post, author);
    return <ItemSkeleton />;
  }

  const isLiked = post.isLikedByRequester;
  const isDisliked = post.isDislikedByRequester;
  const likeCount = post.metric?.likeCount ?? 0;
  const dislikeCount = post.metric?.dislikeCount ?? 0;

  const handleLikeClick = () => {
    const variables = {
      postId: post.postId,
      channelId,
      reactionType: 'LIKE' as const,
    };
    isLiked ? deleteReaction(variables) : createReaction(variables);
  };

  const handleDislikeClick = () => {
    const variables = {
      postId: post.postId,
      channelId,
      reactionType: 'DISLIKE' as const,
    };
    isDisliked ? deleteReaction(variables) : createReaction(variables);
  };

  const isMyPost = author.memberId === myInfo?.memberId;

  return (
    <div className={S.wrapper} ref={itemRef} onClick={onClick}>
      <div className={S.postRow}>
        <div className="flex-shrink-0">
          {isMyPost ? <ServerMemberInfoDialog /> : <ChannelMemberInfoDialog channelMember={author} />}
        </div>

        <div className={S.contentContainer}>
          <div className="flex flex-col gap-2">
            <div className={S.header}>
              <span className={S.username}>{author.username}</span>
              <TimeDisplay createdAt={post.createdAt} />
            </div>
            <p className={S.text}>{post.content}</p>
            {post.images && post.images.length > 0 && (
              <div className={S.imageGrid}>
                {post.images
                  .filter((image) => image.imageUrl)
                  .map((image: Image) => (
                    <img
                      key={image.imageId}
                      src={image.imageUrl!}
                      alt={`포스트 이미지 ${image.imageId}`}
                      className={S.image}
                    />
                  ))}
              </div>
            )}
          </div>

          <div className={S.reactionContainer}>
            {!hideActions && (
              <>
                <LikeButton isLiked={isLiked} count={likeCount} onClick={handleLikeClick} />
                <DislikeButton isDisliked={isDisliked} count={dislikeCount} onClick={handleDislikeClick} />
                <CommentButton post={post} onClick={() => onCommentClick?.(post.postId)} />

                <ViewCount post={post} />
              </>
            )}
          </div>
        </div>
      </div>
      <div className={S.dropdownContainer}>
        <div className={S.dropdownButtonWrapper}>
          <PostDropdown post={post} author={author} channelId={channelId} />
        </div>
      </div>
    </div>
  );
};
