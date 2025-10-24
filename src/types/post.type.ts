import { Image } from "./common.type";
import { ChannelMember } from "./channelMember.type";
import { Reaction } from "./reaction.type";

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
  commentCount: number;
  viewCount: number;
  reaction: Reaction;
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
  cursor: number | null;
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