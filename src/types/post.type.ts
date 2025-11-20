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
  authorId: number;
  metric: Metric;
  isLikedByRequester: boolean;
  isDislikedByRequester: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface PostResponse extends Omit<Post, 'authorId'> {
  author: ChannelMember;
};

export interface PostsResponse {
  authors: ChannelMember[];
  posts: Post[];
  size: number;
  nextCursor: number | null;
  totalElements: number;
  isLast: boolean;
  isInverted: boolean;
};

export interface PostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: Post;
  channelId?: number;
};

export interface RecommendedPostResponse {
  content: {
    postId: number;
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
