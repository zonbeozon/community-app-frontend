export const STOMP_DESTINATIONS = {
  channelMember: () => `/user/queue/channel-membership`,
  channel: (channelId: number) => `/topic/channels/${channelId}`,  
  post: (channelId: number) => `/topic/channels/${channelId}/posts`,
  chat: (chattingGroupName: string) => `/topic/chattingGroups/${chattingGroupName}/chats`,
  comment: (postId: number) => `/topic/posts/${postId}/comments`,
  commentCount: (channelId: number) => `/topic/channels/${channelId}/comment-count`,
  notifications: () => `/user/queue/notifications`
};
