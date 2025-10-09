import { jwtDecode } from "jwt-decode";
import { JwtCode } from "@/types/common.type";

export const decodeToken = (token: string): number | null => {
  try {
    const decoded = jwtDecode<JwtCode>(token);
    return decoded?.sub ? Number(decoded.sub) : null;
  } catch (error) {
    console.error("토큰이 유효하지 않습니다:", error);
    return null;
  }
};