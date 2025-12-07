import type { ChannelMember } from './channelMember.type';
import type { DialogProps } from './common.type';
import type { Post } from './post.type';

export type CommentWithAuthor = Comment & { author: ChannelMember };

export interface Comment {
  commentId: number;
  content: string;
  authorId: number;
  createdAt: string;
}

export interface CommentsResponse {
  authors: ChannelMember[];
  comments: Comment[];
  totalElements: number;
}

export interface CommentItemProps {
  comment: Comment;
  author: ChannelMember;
  isCurrentUser: boolean;
  channelId: number;
}

export interface CommentDialogProps extends DialogProps{
  comment: Comment;
}

export interface CommentListProps {
  postId: number;
  channelId: number;
}

export interface CommentDropdownProps {
  comment: Comment;
  channelId: number;
}

export interface CommentButtonProps {
  post: Post;
  onClick: () => void;
}

export interface CommentInputProps {
  onSubmit: (content: string) => void;
}
