import fetcher from "@/apis/fetcher";
import { BASE_URL, ENDPOINT } from "@/apis/url";
import { CommentsResponse } from "@/types/comment.type";

export const getComments = async (postId: number): Promise<CommentsResponse> => {
  return fetcher.get<CommentsResponse>({
    url: BASE_URL + ENDPOINT.COMMENT(postId)
  });
};

export const createComment = async (postId: number, content: string): Promise<number> => {
  return fetcher.post<number>({
    url: BASE_URL + ENDPOINT.COMMENT(postId),
    body: { content }
  });
};

export const deleteComment = async (commentId: number): Promise<void> => {
  return fetcher.delete<void>({
    url: BASE_URL + ENDPOINT.COMMENT_BY_ID(commentId)
  });
};