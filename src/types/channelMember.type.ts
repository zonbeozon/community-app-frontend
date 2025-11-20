import { Page } from "./common.type";
import { ServerMember } from "./serverMember.type";

export type ChannelRole = "CHANNEL_OWNER" | "CHANNEL_ADMIN" | "CHANNEL_MEMBER";

export interface ChannelMember extends ServerMember{
  channelRole: ChannelRole;
};

export type ChannelMembersResponse = Page<ChannelMember>;

export interface MembersData {
  members: ChannelMember[];
  pageInfo: Page<ChannelMember>;
}

export interface ChannelMemberVariables {
  channelId: number;
  targetMemberId: number;
};

export interface ChannelMemberProfileImageProps {
  profile: {
    imageUrl: string | null;
  } | null;
  username: string | null;
  className?: string; 
};

export interface ChannelMemberDropdownProps {
  channelId: number;
  targetMember: ChannelMember;
};

export interface ChannelMemberInfoDialogProps {
  channelMember: ChannelMember | null;
};

export interface ChannelMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelId: number;
  targetMember: ChannelMember;
};

export type AuthorMap = {
  [key: number]: ChannelMember;
};