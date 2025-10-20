import { Channel } from "@/types/channel.type";
import { ActionDropdown } from "@/components/common/ActionDropdown/ActionDropdown";
import ChannelUpdateDialog from "@/components/channel/ChannelUpdateDialog/ChannelUpdateDialog";
import ChannelLeaveDialog from "@/components/channel/ChannelLeaveDialog/ChannelLeaveDialog";
import ChannelDeleteDialog from "@/components/channel/ChannelDeleteDialog/ChannelDeleteDialog";
import ChannelManageDialog from "@/components/channel/ChannelManageDialog/ChannelManageDialog";
import { useChannelDropdown } from "@/hooks/channel/useChannelDropdown";
import * as S from "./ChannelDropdown.styles";

const ChannelDropdown = ({ channel }: { channel: Channel }) => {
  const {
    dropdown,
    manageDialog,
    updateDialog,
    deleteDialog,
    leaveDialog,
    actions,
  } = useChannelDropdown(channel);

  return (
    <>
      <ActionDropdown
        aria-label="채널 옵션"
        {...dropdown}
        actions={actions}
        triggerClassName={S.dropdownButton}
      /> 
      
      <ChannelManageDialog
        {...manageDialog}
        channelId={channel.channelInfo.channelId}
      />
      <ChannelUpdateDialog
        {...updateDialog}
        channelId={channel.channelInfo.channelId}
      />
      <ChannelDeleteDialog
        {...deleteDialog}
        channelId={channel.channelInfo.channelId}
      />
      <ChannelLeaveDialog
        {...leaveDialog}
        channelId={channel.channelInfo.channelId}
      />
    </>
  );
};

export default ChannelDropdown;