import { useRef, useEffect } from "react";
import { Post } from "@/types/post.type";
import { ChannelMember } from "@/types/channelMember.type";
import useGetMyServerMember from "@/queries/useGetServerMemberById";
import useCreateReaction from "@/hooks/reaction/useCreateReaction";
import useDeleteReaction from "@/hooks/reaction/useDeleteReaction";
import usePostViewLogger from "@/hooks/viewLogger/usePostViewLogger";
import PostDropdown from "@/components/post/PostDropdown/PostDropdown";
import ServerMemberInfoDialog from "@/components/serverMember/ServerMemberInfoDialog/ServerMemberInfoDialog";
import ChannelMemberInfoDialog from "@/components/channelMember/ChannelMemberInfoDialog/ChannelMemberInfoDialog";
import TimeDisplay from "@/components/common/TimeDisplay/TimeDisplay";
import ThumbsUpIcon from "../../reaction/LikeButton/LikeButton";
import ThumbsDownIcon from "../../reaction/DislikeButton/DislikeButton";
import CommentButton from "@/components/comment/CommentButton/CommentButton";
import ViewCount from '@/components/common/ViewCount/ViewCount';
import { Image } from '@/types/common.type';
import ItemSkeleton from '@/components/common/ItemSkeleton/ItemSkeleton';
import * as S from "./PostItem.styles";

interface PostItemProps {
  post: Post;
  author: ChannelMember;
  channelId: number;
  onCommentClick: (postId: number) => void;
}

const VIEW_THRESHOLD_PERCENT = 0.5;
const VIEW_DEBOUNCE_TIME_MS = 500;

const PostItem = ({ post, author, channelId, onCommentClick }: PostItemProps) => {
  const { data: myInfo } = useGetMyServerMember();
  const { mutate: createReaction } = useCreateReaction();
  const { mutate: deleteReaction } = useDeleteReaction();
  const { logView } = usePostViewLogger();

  const itemRef = useRef<HTMLDivElement>(null);
  const viewTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= VIEW_THRESHOLD_PERCENT) {
            if (!viewTimer.current) {
              viewTimer.current = setTimeout(() => {
                logView(post.id);
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
      { threshold: VIEW_THRESHOLD_PERCENT }
    );
    
    const currentRef = itemRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      if (viewTimer.current) clearTimeout(viewTimer.current);
    };
  }, [post.id, logView]);

  if (!post || !author) {
    return <ItemSkeleton />;
  }

  const { reaction } = post;
  const isLiked = reaction?.likedByCurrentMember ?? false;
  const isDisliked = reaction?.dislikedByCurrentMember ?? false;
  const likeCount = reaction?.likeCount ?? 0;
  const dislikeCount = reaction?.dislikeCount ?? 0;

  const handleLikeClick = () => {
    const variables = { postId: post.id, channelId, reactionType: 'LIKE' as const };
    isLiked ? deleteReaction(variables) : createReaction(variables);
  };

  const handleDislikeClick = () => {
    const variables = { postId: post.id, channelId, reactionType: 'DISLIKE' as const };
    isDisliked ? deleteReaction(variables) : createReaction(variables);
  };

  const isMyPost = author.memberId === myInfo?.memberId;

  return (
    <div className={S.wrapper} ref={itemRef}>
      <div className={S.postRow}>
        <div className="flex-shrink-0">
          {isMyPost ? (
            <ServerMemberInfoDialog />
          ) : (
            <ChannelMemberInfoDialog channelMember={author} />
          )}
        </div>

        <div className={S.contentContainer}>
          <div className="flex flex-col gap-2">
            <div className={S.header}>
              <span className={S.username}>{author.username || "알 수 없는 사용자"}</span>
              <TimeDisplay createdAt={post.createdAt} />
            </div>
            <p className={S.text}>{post.content}</p>
            {post.images && post.images.length > 0 && (
              <div className={S.imageGrid}>
                {post.images
                  .filter(image => image.imageUrl)
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
            <ThumbsUpIcon 
              isLiked={isLiked} 
              count={likeCount} 
              onClick={handleLikeClick} 
            />
            <ThumbsDownIcon 
              isDisliked={isDisliked} 
              count={dislikeCount} 
              onClick={handleDislikeClick} 
            />
            <CommentButton post={post} onClick={() => onCommentClick(post.id)} />
            <ViewCount post={post} />
          </div>
        </div>
      </div>
      <div className={S.dropdownContainer}>
        <div className={S.dropdownButtonWrapper}>
          <PostDropdown post={post} channelId={channelId} />
        </div>
      </div>
    </div>
  );
};

export default PostItem;