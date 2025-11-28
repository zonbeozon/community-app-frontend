import { ChannelDeleteDialog } from '@/components/channel/ChannelDeleteDialog/ChannelDeleteDialog';
import { ChannelLeaveDialog } from '@/components/channel/ChannelLeaveDialog/ChannelLeaveDialog';
import { ChannelManageDialog } from '@/components/channel/ChannelManageDialog/ChannelManageDialog';
import { ChannelUpdateDialog } from '@/components/channel/ChannelUpdateDialog/ChannelUpdateDialog';
import { ActionDropdown } from '@/components/common/ActionDropdown/ActionDropdown';
import { useChannelDropdown } from '@/hooks/channel/useChannelDropdown';
import type { Channel } from '@/types/channel.type';
import * as S from './ChannelDropdown.styles';

export const ChannelDropdown = ({ channel }: { channel: Channel }) => {
  const { dropdown, manageDialog, updateDialog, deleteDialog, leaveDialog, actions } = useChannelDropdown(channel);

  return (
    <>
      <ActionDropdown aria-label="채널 옵션" {...dropdown} actions={actions} triggerClassName={S.dropdownButton} />

      <ChannelManageDialog {...manageDialog} channel={channel} />
      <ChannelUpdateDialog {...updateDialog} channel={channel} />
      <ChannelDeleteDialog {...deleteDialog} channel={channel} />
      <ChannelLeaveDialog {...leaveDialog} channel={channel} />
    </>
  );
};
