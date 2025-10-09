export type ReactionType = "LIKE" | "DISLIKE";

export interface Reaction {
  likeCount: number;
  dislikeCount: number;
  likedByCurrentMember: boolean;
  dislikedByCurrentMember: boolean;
};

export interface LikeButtonProps {
  isLiked: boolean;
  count: number;
  onClick: () => void;
};

export interface DislikeButtonProps {
  isDisliked: boolean;
  count: number;
  onClick: () => void;
};