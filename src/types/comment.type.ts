import type { ChannelMember } from "./channelMember.type";
import type { Post } from "./post.type";

export type CommentWithAuthor = Comment & { author: ChannelMember };

export interface Comment {
  commentId: number;
  content: string;
  authorId: number;
  createdAt: string;
}

export interface CommentStore {
  comments: Record<number, Comment[]>;
  setComments: (postId: number, comments: Comment[]) => void;
  addComment: (postId: number, newComment: Comment) => void;
  removeComment: (postId: number, commentId: number) => void;
}

export interface CommentsResponse {
  authors: ChannelMember[];
  comments: Comment[];
  totalElements: number;
}

export interface CreateCommentProps {
  postId: number;
  content: string;
}

export interface DeleteCommentProps {
  postId: number;
  commentId: number;
}

export interface CommentItemProps {
  comment: Comment;
  author: ChannelMember;
  isCurrentUser: boolean;
  channelId: number;
}

export interface CommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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