export type ReactionType = "LIKE" | "DISLIKE";

export interface Metric {
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  viewCount: number;
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