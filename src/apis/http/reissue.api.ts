import { api } from '@/apis/interceptor';
import { ENDPOINT } from '@/apis/url';

export const reissue = async (): Promise<string> => {
  const response = await api.post(ENDPOINT.REISSUE, {}, { headers: { Authorization: null } });
  return response.data?.accessToken;
};
