import api from "../interceptor";
import { ENDPOINT } from "../url";

export const reissue = async (): Promise<string> => {
  const response = await api.post(
    ENDPOINT.REISSUE,
    {},
    { headers: { Authorization: null } }
  );

  return response.data?.accessToken;
};
