import { ReactNode } from 'react';
import type { Page } from './common.type';
import type { ServerMember } from './serverMember.type';

export type ChannelMemberRole = 'CHANNEL_OWNER' | 'CHANNEL_ADMIN' | 'CHANNEL_MEMBER';
export type ChannelMemberDialogType = 'approve' | 'deny' | null;

export interface ChannelMember extends ServerMember {
  channelRole: ChannelMemberRole;
}

export type ChannelMembersResponse = Page<ChannelMember>;

export interface ChannelMembersData {
  members: ChannelMember[];
  pageInfo: Page<ChannelMember>;
}

export interface ChannelMemberProps {
  channelId: number;
  targetMember: ChannelMember;
}

export interface ChannelMemberIdProps {
  channelId: number;
  targetMemberId: number;
}

export interface ChannelMemberItemProps {
  member: ChannelMember;
  actions: ReactNode;
}

export interface ChannelMemberRoleProps {
  channelId: number;
  targetMemberId: number;
  wantToRole: ChannelMemberRole;
}

export interface ChannelMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelId: number;
  targetMember: ChannelMember;
}

export interface ChannelMemberDialogState {
  type: ChannelMemberDialogType;
  member: ChannelMember | null;
}

export interface ChannelMemberProfileImageProps {
  profile: {
    imageUrl: string | null;
  } | null;
  username: string | null;
  className?: string;
}
