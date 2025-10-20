import { Image } from "./common.type";
import { ChannelMember } from "./channelMember.type";

export type ChannelType = "BLOG" | "CHAT";
export type ContentVisibility = "PUBLIC" | "PRIVATE";
export type JoinPolicy = "OPEN" | "APPROVAL" | "DENY" ;

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
  membership: ChannelMember;
};

export interface ChannelRequest {
  title: string;
  description: string;
  imageId: number | null;
  channelType: ChannelType;
  settings: ChannelSettings;
};

export interface ChannelsResponse {
  channels: Channel[]; 
  totalElements: number;
};

export interface UpdatechannelVariables {
  channelId: number;
  payload: ChannelRequest;
}

export interface ChannelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelId: number;
};

export interface ChannelGroupProps {
  title: string;
  channels: Channel[];
};

export interface ChannelHeaderProps {
  showBackButton: boolean;
}

export interface ChannelSearchResultTemp {
  channelId: number;
  channelType: ChannelType;
  title: string;
  description: string;
  profile: Image | null;
  settings: ChannelSettings;
  memberCount: number;
}

export interface ChannelJoinButtonProps {
  channel: ChannelSearchResultTemp;
  onJoinSuccess: () => void;
}