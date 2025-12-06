import { Crown, User, UserStar } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { ChannelRole } from '@/types/channelMember.type';

const roleDetails: Record<ChannelRole, { Icon: React.ElementType; className: string; label: string }> = {
  CHANNEL_OWNER: {
    Icon: Crown,
    className: 'text-yellow-500',
    label: 'Owner',
  },
  CHANNEL_ADMIN: {
    Icon: UserStar,
    className: 'text-blue-500',
    label: 'Admin',
  },
  CHANNEL_MEMBER: {
    Icon: User,
    className: 'text-gray-500',
    label: 'Member',
  },
};

const ROLE_ICON_SIZE = 16;

export const ChannelMemberRoleIcon = ({ role }: { role: ChannelRole }) => {
  const details = roleDetails[role] || roleDetails['CHANNEL_MEMBER'];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <details.Icon size={ROLE_ICON_SIZE} className={details.className} />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{details.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

