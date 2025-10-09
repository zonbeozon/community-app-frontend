import { Crown, User, UserStar } from 'lucide-react';
import { ChannelRole } from '@/types/channelMember.type';

export const wrapper = "flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors";

export const infoContainer = "flex items-center gap-4";

export const profileImage = "w-10 h-10 rounded-full object-cover";

export const profileFallback = "w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 font-bold";

export const username = "font-semibold text-gray-900 dark:text-white";

export const actionsContainer = "flex items-center gap-4";

export const roleDetails: Record<ChannelRole, { Icon: React.ElementType; className: string; label: string }> = {
  CHANNEL_OWNER: {
    Icon: Crown,
    className: 'text-yellow-500',
    label: 'Owner'
  },
  CHANNEL_ADMIN: {
    Icon: UserStar,
    className: 'text-blue-500',
    label: 'Admin'
  },
  CHANNEL_MEMBER: {
    Icon: User,
    className: 'text-gray-500',
    label: 'Member'
  }
};

export const roleIconSize = 16;

export const dropdownContainer = "relative";