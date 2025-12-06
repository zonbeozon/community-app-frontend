import { fetcher } from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';

export const signOut = async (): Promise<void> => {
  return await fetcher.delete<void>({
    url: BASE_URL + ENDPOINT.SIGNOUT,
  });
};
