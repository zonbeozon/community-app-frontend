import type { ChannelMemberRole } from '@/types/channelMember.type'; 

const ROLE_HIERARCHY: readonly ChannelMemberRole[] = [
  'CHANNEL_MEMBER',
  'CHANNEL_ADMIN',
  'CHANNEL_OWNER',
];

const getRoleValue = (role?: ChannelMemberRole | string | null): number => {
  if (!role) return -1;
  return ROLE_HIERARCHY.indexOf(role as ChannelMemberRole);
};

export const channelMemberRoleManager = {
  isRoleHigher: (
    roleA?: ChannelMemberRole | string | null,
    roleB?: ChannelMemberRole | string | null
  ): boolean => {
    return getRoleValue(roleA) > getRoleValue(roleB);
  },

  isOwner: (role?: ChannelMemberRole | string | null): boolean => {
    return getRoleValue(role) === getRoleValue('CHANNEL_OWNER');
  },

  isAdmin: (role?: ChannelMemberRole | string | null): boolean => {
    return getRoleValue(role) >= getRoleValue('CHANNEL_ADMIN');
  },

  isMember: (role?: ChannelMemberRole | string | null): boolean => {
    return getRoleValue(role) === getRoleValue('CHANNEL_MEMBER');
  },
};