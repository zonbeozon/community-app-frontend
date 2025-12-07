import { ChannelMemberBanDialog } from '@/components/channelMember/ChannelMemberBanDialog/ChannelMemberBanDialog';
import { ChannelMemberRoleChangeDialog } from '@/components/channelMember/ChannelMemberRoleChangeDialog/ChannelMemberRoleChangeDialog';
import { ActionDropdown } from '@/components/common/ActionDropdown/ActionDropdown';
import { useChannelMemberDropdown } from '@/hooks/channelMember/useChannelMemberDropdown';
import type { ChannelMemberProps } from '@/types/channelMember.type';
import * as S from './ChannelMemberDropdown.styles';

export const ChannelMemberDropdown = ({ channelId, targetMember }: ChannelMemberProps) => {
  const { dropdown, actions, roleDialog, banDialog } = useChannelMemberDropdown(targetMember);

  return (
    <>
      <ActionDropdown aria-label="채널 멤버 옵션" {...dropdown} actions={actions} triggerClassName={S.dropdownButton} />

      <ChannelMemberRoleChangeDialog {...roleDialog} channelId={channelId} targetMember={targetMember} />
      <ChannelMemberBanDialog {...banDialog} channelId={channelId} targetMember={targetMember} />
    </>
  );
};
