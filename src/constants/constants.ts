import { ChannelRequest } from "@/types/channel.type";
import { PostRequest } from "@/types/post.type";

export const MAX_CHANNEL_TITLE_LENGTH = 32 as const;
export const MIN_CHANNEL_TITLE_LENGTH = 2 as const;
export const MAX_CHANNEL_DESCRIPTION_LENGTH = 256 as const;
export const MAX_POST_CONTENT_LENGTH = 2048 as const;
export const MAX_USER_NAME_LENGTH = 32 as const;
export const NOT_ALLOWED_REGEX = /[<>:"\/\\|*\x00-\x1F]/;

export const DEFAULT_PAGE_REQUEST = {
  page: 0,
  size: 20,
} as const;

export const DEFAULT_CHANNEL_VALUES: ChannelRequest = {
  title: "",
  description: "",
  imageId: null,
  channelType: "BLOG",
  settings: {
    contentVisibility: "PUBLIC",
    joinPolicy: "OPEN",
  },
} as const;

export const DEFAULT_POST_VALUES: PostRequest = {
  content: "",
  imageIds: [] as number[],
} as const;