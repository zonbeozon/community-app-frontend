import { ChannelRequest } from "@/types/channel.type";
import { PostRequest } from "@/types/post.type";

export const MAX_CHANNEL_TITLE_LENGTH = 32;
export const MIN_CHANNEL_TITLE_LENGTH = 2;
export const MAX_CHANNEL_DESCRIPTION_LENGTH = 256;

export const MAX_POST_CONTENT_LENGTH = 2048;

export const MAX_USER_NAME_LENGTH = 32;

export const NOT_ALLOWED_REGEX = /[<>:"\/\\|*\x00-\x1F]/;

export const DEFAULT_CHANNEL_VALUES: ChannelRequest = {
  title: "",
  description: "",
  imageId: null,
  channelType: "BLOG",
  settings: {
  contentVisibility: "PUBLIC",
  joinPolicy: "OPEN",   
  }
};

export const DEFAULT_POST_VALUES: PostRequest = {
  content: "",
  imageIds: [] as number[],
};