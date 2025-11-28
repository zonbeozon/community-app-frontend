import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import type { PostRequest, PostResponse, PostsParams, PostsResponse, RecommendedPostResponse } from '@/types/post.type';

export const getPosts = async (channelId: number, params: PostsParams = {}): Promise<PostsResponse> => {
  const queryParams = {
    size: 20,
    inverted: false,
    ...params,
  };
  return fetcher.get<PostsResponse>({
    url: BASE_URL + ENDPOINT.POST(channelId),
    params: queryParams,
  });
};

export const getPost = async (postId: number): Promise<PostResponse> => {
  return fetcher.get<PostResponse>({
    url: BASE_URL + ENDPOINT.POST_BY_ID(postId),
  });
};

export const createPost = async (channelId: number, payload: PostRequest): Promise<number> => {
  return fetcher.post<number>({
    url: BASE_URL + ENDPOINT.POST(channelId),
    body: payload,
  });
};

export const updatePost = async (postId: number, payload: PostRequest): Promise<void> => {
  return fetcher.patch<void>({
    url: BASE_URL + ENDPOINT.POST_BY_ID(postId),
    body: payload,
  });
};

export const deletePost = async (postId: number): Promise<void> => {
  return fetcher.delete<void>({
    url: BASE_URL + ENDPOINT.POST_BY_ID(postId),
  });
};

export const updatePostViewCount = async (postIds: number[]): Promise<void> => {
  return fetcher.post<void>({
    url: BASE_URL + ENDPOINT.POST_VIEWCOUNT,
    body: { postIds: postIds },
  });
};

export const getRecommendedPosts = async (params: PostsParams = {}): Promise<RecommendedPostResponse> => {
  const queryParams = {
    size: 20,
    inverted: false,
    ...params,
  };
  return fetcher.get<RecommendedPostResponse>({
    url: BASE_URL + ENDPOINT.POST_RECOMMED,
    params: queryParams,
  });
};
