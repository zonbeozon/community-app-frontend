export const BASE_URL = import.meta.env.VITE_API_URL

export const ENDPOINT = {
  //Channel
  CHANNEL: `/channels`,
  CHANNEL_BY_ID: (channelId: number) => `/channels/${channelId}`,
  CHANNEL_JOINED: `/channels/joined`,
  CHANNEL_JOINED_BY_ID: (channelId: number) => `/channels/joined/${channelId}`,

  //ChannelMember
  CHANNELMEMBER: (channelId: number) => `/channels/${channelId}/members`,
  CHANNELMEMBER_DENY: (channelId: number, memberId: number) => `/channels/${channelId}/members/${memberId}/deny`,
  CHANNELMEMBER_BAN: (channelId: number, memberId: number) => `/channels/${channelId}/members/${memberId}/ban`,
  CHANNELMEMBER_APPROVE: (channelId: number, memberId: number) => `/channels/${channelId}/members/${memberId}/approve`,
  CHANNELMEMBER_ROLE: (channelId: number, memberId: number) => `/channels/${channelId}/members/${memberId}/role`,
  CHANNELMEMBER_PENDING: (channelId: number) => `/channels/${channelId}/members/pending`,
  CHANNELMEMBER_BANNED: (channelId: number) => `/channels/${channelId}/members/ban`,

  //Post
  POST: (channelId: number) => `/channels/${channelId}/posts`,
  POST_BY_ID: (postId: number) => `/posts/${postId}`,
  POST_VIEWCOUNT: '/posts/view-count',
  POST_RECOMMED: '/posts/recommend',

  //Chatting
  CHAT_ID: (chatId: number) => `/chats/${chatId}`,
  CHAT_IMAGE: (chatId: number) => `/chats/${chatId}/images`,
  CHAT_GROUP: (chattingGroupId: number) => `/chattingGroups/${chattingGroupId}/chats`,

  //Comment
  COMMENT: (postId: number) => `/posts/${postId}/comments`,
  COMMENT_BY_ID: (commentId: number) => `/comments/${commentId}`,

  //Reaction
  REACTION: (postId: number) => `/posts/${postId}/reactions`,

  //Notificatiion
  NOTIFICATION: `/notifications`,
  NOTIFICATION_READ: `/notifications/mark-as-read`,

  //ServerMember
  SERVERMEMBER: `/members`,
  SERVERMEMBER_USERNAME: `/members/username`,
  SERVERMEMBER_PROFILE: `/members/profile`,
  SERVERMEMBER_BY_ID: (memberId: number) => `/members/${memberId}`,

  //Auth
  REISSUE: `/auth/reissue`,
  SIGNOUT: `/auth/logout`,

  //Crypto
  CRYPTOS: `/info/coin`,
  CRYPTO_SYMBOL: (symbol: string) => `/info/coin/${symbol}`,

  //Image
  IMAGE: `/images`,

  //Kline
  KLINE: "/proxy-api/api/v3/klines",
};
