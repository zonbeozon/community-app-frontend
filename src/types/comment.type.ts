import { ChannelMember } from "./channelMember.type";

export interface Comment {
  commentId: number;
  content: string;
  authorId: number;
  createdAt: string;
};

export interface CommentStore {
  comments: Record<number, Comment[]>;
  setComments: (postId: number, comments: Comment[]) => void;
  addComment: (postId: number, newComment: Comment) => void;
  removeComment: (postId: number, commentId: number) => void;
};

export interface CommentsResponse {
  authors: ChannelMember[];
  comments: Comment[];
  totalElements: number;
};

export interface CommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comment: Comment
};

export interface CommentListProps {
  comments: Comment[];
  channelId: number;
};