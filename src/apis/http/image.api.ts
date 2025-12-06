import { fetcher } from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import type { Image } from '@/types/common.type';

export const uploadImage = async (formData: FormData): Promise<Image> => {
  return await fetcher.post<Image>({
    url: BASE_URL + ENDPOINT.IMAGE,
    body: formData,
  });
};
