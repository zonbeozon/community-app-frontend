import { Image } from "./common.type";
import { ChannelMember } from "./channelMember.type";
import { Reaction } from "./reaction.type";

export interface PostsParams {
  cursorPostId?: number | null;
  size?: number;
  inverted?: boolean;
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

export interface PostStore {
  posts: { [postId: number]: Post };
  authors: { [authorId: number]: ChannelMember };
  postIdsByChannel: { [channelId: number]: number[] };
  selectedPostId: number | null;
  upsertPostsAndAuthors: (channelId: number | null, data: any, options?: { prepend?: boolean }) => void;
  removePost: (postId: number) => void;
  patchPost: (postId: number, updatedData: Partial<Post>) => void;
  setSelectedPostId: (postId: number | null) => void;
  updateReaction: (postId: number, reactionType: 'LIKE' | 'DISLIKE') => void;
  clearChannelPosts: (channelId: number) => void;
  setCommentCount: (postId: number, count: number) => void;
}

export interface PostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: Post;
};