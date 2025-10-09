import type { ChannelRole } from '@/types/channelMember.type'; 

const ROLE_HIERARCHY: readonly ChannelRole[] = [
  'CHANNEL_MEMBER',
  'CHANNEL_ADMIN',
  'CHANNEL_OWNER',
];

const getRoleValue = (role?: ChannelRole | string | null): number => {
  if (!role) return -1;
  return ROLE_HIERARCHY.indexOf(role as ChannelRole);
};

const ChannelRoleManager = {

  isRoleHigher: (
    roleA?: ChannelRole | string | null,
    roleB?: ChannelRole | string | null
  ): boolean => {
    return getRoleValue(roleA) > getRoleValue(roleB);
  },

  isOwner: (role?: ChannelRole | string | null): boolean => {
    return getRoleValue(role) === getRoleValue('CHANNEL_OWNER');
  },

  isAdmin: (role?: ChannelRole | string | null): boolean => {
    return getRoleValue(role) >= getRoleValue('CHANNEL_ADMIN');
  },

  isMember: (role?: ChannelRole | string | null): boolean => {
    return getRoleValue(role) === getRoleValue('CHANNEL_MEMBER');
  },
};

export default ChannelRoleManager;