import { PageRequest } from "@/types/common.type";

export const QUERY_KEYS = {
    all: ['all'] as const,

    channels: {
      all: ['channels'] as const,
      lists: () => [...QUERY_KEYS.channels.all, 'list'] as const,
      list: (filters: object) => [...QUERY_KEYS.channels.lists(), filters] as const,
      joinedLists: () => [...QUERY_KEYS.channels.all, 'joined-list'] as const,
      joinedList: (filters: object) => [...QUERY_KEYS.channels.joinedLists(), filters] as const,
      details: () => [...QUERY_KEYS.channels.all, 'detail'] as const,
      detail: (channelId: number | string) => [...QUERY_KEYS.channels.details(), channelId] as const,
    },
  
    posts: {
      all: ['posts'] as const,
      lists: () => [...QUERY_KEYS.posts.all, 'list'] as const,
      list: (channelId: number | string, filters: object) => [...QUERY_KEYS.posts.lists(), channelId, filters] as const,
      details: () => [...QUERY_KEYS.posts.all, 'detail'] as const,
      detail: (postId: number | string) => [...QUERY_KEYS.posts.details(), postId] as const,
    },

    comments: {
      all: ['comments'] as const,
      lists: () => [...QUERY_KEYS.comments.all, 'list'] as const,
      list: (postId: number | string, filters: object) => 
        [...QUERY_KEYS.comments.lists(), postId, filters] as const,
      details: () => [...QUERY_KEYS.comments.all, 'detail'] as const,
      detail: (commentId: number | string) => 
        [...QUERY_KEYS.comments.details(), commentId] as const,
    },
    
    channelMember: {
      all: ['channelMember'] as const,
      lists: () => [...QUERY_KEYS.channelMember.all, 'list'] as const,
      list: (channelId: number, pageRequest: PageRequest) =>
        [...QUERY_KEYS.channelMember.lists(), channelId, pageRequest] as const,
      bannedLists: () => [...QUERY_KEYS.channelMember.lists(), 'banned'] as const,
      bannedList: (channelId: number, pageRequest: PageRequest) => 
        [...QUERY_KEYS.channelMember.bannedLists(), channelId, pageRequest] as const,
      pendingLists: () => [...QUERY_KEYS.channelMember.lists(), 'pending'] as const,
      pendingList: (channelId: number, pageRequest: PageRequest) => 
        [...QUERY_KEYS.channelMember.pendingLists(), channelId, pageRequest] as const,
      detail: () => [...QUERY_KEYS.channelMember.all, 'detail'] as const,
    },

    notifications: {
      all: ['notifications'] as const,
      lists: () => [...QUERY_KEYS.notifications.all, 'list'] as const,
      list: (filters: object) => 
        [...QUERY_KEYS.notifications.lists(), filters] as const,
      details: () => [...QUERY_KEYS.notifications.all, 'detail'] as const,
      detail: (notificationId: number | string) => 
        [...QUERY_KEYS.notifications.details(), notificationId] as const,
    },

    serverMember: {
      all: ['serverMember'] as const,
      details: () => [...QUERY_KEYS.serverMember.all, 'detail'] as const,
      detail: (userId: number | string | null) => [...QUERY_KEYS.serverMember.details(), userId] as const,
      me: () => [...QUERY_KEYS.serverMember.details(), 'me'] as const,
    }
  };

