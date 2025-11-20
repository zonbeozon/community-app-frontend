import { Image } from "./common.type";
import { ChannelMember } from "./channelMember.type";

export type ChannelType = "BLOG" | "CHAT";
export type ContentVisibility = "PUBLIC" | "PRIVATE";
export type JoinPolicy = "OPEN" | "APPROVAL" | "DENY";

export interface ChannelSettings {
  contentVisibility: ContentVisibility;
  joinPolicy: JoinPolicy;
};

export interface Channel {
  channelInfo: {
    channelId: number;
    channelType: ChannelType;
    title: string;
    description: string;
    profile: Image | null;
    settings: ChannelSettings;
    memberCount: number;
  };
  isJoined?: boolean;
  membership: ChannelMember;
};

export interface ChannelRequest {
  title: string;
  description: string;
  imageId: number | null;
  channelType: ChannelType;
  settings: ChannelSettings;
};

export interface JoinedChannelsResponse {
  channels: Channel[]; 
  totalElements: number;
};

export interface UpdatechannelVariables {
  channelId: number;
  payload: ChannelRequest;
};

export interface ChannelProfileImageProps extends React.ComponentPropsWithoutRef<'div'> {
  channelInfo: {
    title: string;
    profile: {
      imageUrl: string | null;
    } | null;
  };
  size: 'sm' | 'lg';
};

export interface ChannelHeaderProps {
  showBackButton: boolean;
  channelData: Channel;
  isMember: boolean;
  isAdmin: boolean;
  isOwner: boolean;
};

export interface ChannelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelId: number;
};

export interface ChannelJoinDialogProps {
  channel: Channel;
  onJoinSuccess?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export interface ChannelGroupProps {
  title: string;
  channels: Channel[];
};

export interface ChannelJoinButtonProps {
  channel: Channel;
  onJoinSuccess: () => void;
};

export interface ChannelSearchResultTemp {
  channelId: number;
  channelType: ChannelType;
  title: string;
  description: string;
  profile: Image | null;
  settings: ChannelSettings;
  memberCount: number;
};
