import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "@/types/common.type";
import { SERVER_ERROR_MESSAGES } from "@/constants/messages";

export const decodeToken = (token: string) => {
  if (!token) {
    throw new Error(SERVER_ERROR_MESSAGES.TOKEN_MISSING);
  }
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded?.sub ? Number(decoded.sub) : null;
  } catch (error) {
    console.error(SERVER_ERROR_MESSAGES.TOKEN_INVALID, error);
    return null;
  }
};