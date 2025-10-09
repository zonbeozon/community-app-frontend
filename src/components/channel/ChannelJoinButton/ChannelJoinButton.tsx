import { Button } from '@/components/ui/button';
import ChannelJoinDialog from '@/components/channel/ChannelJoinDialog/ChannelJoinDialog';
import { ChannelSearchResultTemp } from '@/components/channel/ChannelSearchbar/ChannelSearchbar';

interface ChannelJoinButtonProps {
  channel: ChannelSearchResultTemp;
  onJoinSuccess: () => void;
}

const ChannelJoinButton = ({ channel, onJoinSuccess }: ChannelJoinButtonProps) => {
  
  return (
    <ChannelJoinDialog channel={channel} onJoinSuccess={onJoinSuccess}>
      <Button
        variant="outline"
        size="sm"
        onClick={(e) => e.stopPropagation()}
        className="h-7 px-2" 
      >
        참여
      </Button>
    </ChannelJoinDialog>
  );
};

export default ChannelJoinButton;