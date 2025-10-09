import { Image } from "./common.type";

export type LoginStatus = "SIGNED_IN" | "SIGNED_OUT";
export type ServerRole = "USER" | "ADMIN";

export interface ServerMember {
  memberId: number;
  username: string;
  profile: Image | null;
  serverRole: ServerRole;
};

export interface ServerMembersResponse {
  content: ServerMember[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
};

export interface ServerMemberStore {
  serverMember: ServerMember | null,    
  loginStatus: LoginStatus;
  setServerMember: (serverMember: ServerMember) => void;
  clearServerMember: () => void;
};