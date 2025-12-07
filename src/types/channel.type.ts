import type { ChannelMember } from './channelMember.type';
import type { Image } from './common.type';

export type ContentVisibility = 'PUBLIC' | 'PRIVATE';
export type JoinPolicy = 'OPEN' | 'APPROVAL' | 'DENY';

export interface ChannelSettings {
  contentVisibility: ContentVisibility;
  joinPolicy: JoinPolicy;
}

export interface Channel {
  channelInfo: {
    channelId: number;
    title: string;
    description: string;
    profile: Image | null;
    settings: ChannelSettings;
    memberCount: number;
  };
  membership: ChannelMember;
}

export interface ChannelPayload {
  title: string;
  description: string;
  imageId: number | null;
  settings: ChannelSettings;
}

export interface JoinedChannelsResponse {
  channels: Channel[];
  totalElements: number;
}

export interface ChannelGroupProps {
  title: string;
  channels: Channel[];
}

export interface ChannelHeaderProps {
  showBackButton: boolean;
  channelData: Channel;
  isMember: boolean;
  selectedChannel: Channel | undefined | null;
  canCreatePost: boolean;
}

export interface ChannelDialogProps {
  channel?: Channel | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface ChannelJoinDialogProps {
  channel: Channel;
  onJoinSuccess?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface ChannelJoinButtonProps {
  channel: Channel;
  onJoinSuccess: () => void;
}

export interface ChannelProfileImageProps extends React.ComponentPropsWithoutRef<'div'> {
  channelInfo: {
    title: string;
    profile: {
      imageUrl: string | null;
    } | null;
  };
  size: 'sm' | 'lg';
}
