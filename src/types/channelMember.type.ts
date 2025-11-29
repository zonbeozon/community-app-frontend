import { ReactNode } from 'react';
import type { Page } from './common.type';
import type { ServerMember } from './serverMember.type';

export type ChannelRole = 'CHANNEL_OWNER' | 'CHANNEL_ADMIN' | 'CHANNEL_MEMBER';

export interface ChannelMember extends ServerMember {
  channelRole: ChannelRole;
}

export type ChannelMembersResponse = Page<ChannelMember>;

export interface MembersData {
  members: ChannelMember[];
  pageInfo: Page<ChannelMember>;
}

export interface ChannelMemberProfileImageProps {
  profile: {
    imageUrl: string | null;
  } | null;
  username: string | null;
  className?: string;
}

export interface ChannelMemberProps {
  channelId: number;
  targetMember: ChannelMember;
}

export interface ChannelMemberIdProps {
  channelId: number;
  targetMemberId: number;
}

export interface ChannelMemberRoleProps {
  channelId: number;
  targetMemberId: number;
  wantToRole: ChannelRole;
}

export interface ChannelMemberItemProps {
  member: ChannelMember;
  actions: ReactNode;
}

export interface ChannelMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelId: number;
  targetMember: ChannelMember;
}

export type AuthorMap = {
  [key: number]: ChannelMember;
};
