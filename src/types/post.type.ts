import type { ChannelMember } from './channelMember.type';
import type { Image } from './common.type';
import type { Metric } from './reaction.type';
import type { ServerMember } from './serverMember.type';

export interface Post extends Omit<PostPayload, 'imageIds'> {
  postId: number;
  images: Image[];
  author: ChannelMember;
  metric: Metric;
  isLikedByRequester: boolean;
  isDislikedByRequester: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PostPayload {
  imageIds: number[];
  content: string;
}

export interface PostsParams {
  cursorPostId?: number | null;
  size?: number;
  inverted?: boolean;
  page?: number;
}

export interface InfinitePostsData {
  posts: Post[];
  authors: Record<number, ChannelMember>;
}

export interface PostsResponse {
  posts: Post[];
  size: number;
  nextCursor: number | null;
  totalElements: number;
  isLast: boolean;
  isInverted: boolean;
}

export interface RecommendedPostsResponse {
  content: {
    postId: number;
    channelId: number;
    content: string;
    images: Image[];
    metric: Metric;
    author: ServerMember;
    createdAt: string;
    updatedAt: string;
  }[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  lastUpdated: string;
}

export interface PostItemProps {
  post: Post;
  author: ChannelMember;
  channelId: number;
  onClick?: () => void;
  onCommentClick?: ((postId: number) => void) | null;
  hideActions: boolean;
}

export interface PostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: Post;
  channelId?: number;
}

export interface PostDropdownProps {
  post: Post;
  author: ChannelMember;
  channelId: number;
}
