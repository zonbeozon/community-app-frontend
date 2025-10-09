export const STOMP_DESTINATIONS = {
  channelMember: () => `/user/queue/channel-membership`,
  channel: (channelId: number) => `/topic/channel/${channelId}`,  
  post: (channelId: number) => `/topic/channel/${channelId}/post`,
  comment: (postId: number) => `/topic/post/${postId}/comment`,
  commentCount: (channelId: number) => `/topic/channel/${channelId}/comment-count`,
  notifications: () => `/user/queue/notifications`
};
