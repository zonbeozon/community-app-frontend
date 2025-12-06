import { Image } from "./common.type";
import { ChannelMember } from "./channelMember.type";
import { Metric } from "./reaction.type";
import { ServerMember } from "./serverMember.type";

export interface PostsParams {
  cursorPostId?: number | null;
  size?: number;
  inverted?: boolean;
  page?: number;
} 

export interface PostRequest {
  imageIds: number[];
  content: string;
};

export interface Post extends Omit<PostRequest, "imageIds">{
  postId: number;
  images: Image[];
  author: ChannelMember;
  metric: Metric;
  isLikedByRequester: boolean;
  isDislikedByRequester: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface InfinitePostsData {
  posts: Post[];
  authors: Record<number, ChannelMember>;
}

export interface PostItemProps {
  post: Post;
  author: ChannelMember;
  channelId: number;
  onClick?: () => void;
  onCommentClick?: ((postId: number) => void) | null; 
  hideActions: boolean;
}

export interface PostsResponse {
  posts: Post[];
  size: number;
  nextCursor: number | null;
  totalElements: number;
  isLast: boolean;
  isInverted: boolean;
};

export interface CreatePostVars {
  channelId: number;
  payload: PostRequest;
}

export interface DeletePostVars {
  postId: number;
  channelId: number;
}

export interface UpdatePostVars {
  postId: number;
  channelId: number;
  payload: PostRequest;
}

export interface PostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: Post;
  channelId?: number;
};

export interface PostDropdownProps {
  post: Post;
  author: ChannelMember;
  channelId: number;
}

export interface RecommendedPostResponse {
  content: {
    postId: number;
    channelId: number;
    content: string;
    images: Image[];
    metric: Metric;
    author: ServerMember
    createdAt: string;
    updatedAt: string;
  }[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  lastUpdated: string;
};
