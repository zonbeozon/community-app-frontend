import { fetcher } from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import type { ReactionType } from '@/types/reaction.type';

export const createReaction = async (postId: number, reactionType: ReactionType): Promise<void> => {
  return fetcher.post<void>({
    url: BASE_URL + ENDPOINT.REACTION(postId),
    params: { reactionType: reactionType },
  });
};

export const deleteReaction = async (postId: number): Promise<void> => {
  return fetcher.delete<void>({
    url: BASE_URL + ENDPOINT.REACTION(postId),
  });
};
