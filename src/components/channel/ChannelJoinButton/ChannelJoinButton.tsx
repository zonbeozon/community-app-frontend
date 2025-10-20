import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ChannelJoinDialog from '@/components/channel/ChannelJoinDialog/ChannelJoinDialog';
import { ChannelSearchResultTemp } from '@/types/channel.type';
import * as S from "./ChannelJoinButton.styles"

interface ChannelJoinButtonProps {
  channel: ChannelSearchResultTemp;
  onJoinSuccess: () => void;
}

const ChannelJoinButton = ({ channel, onJoinSuccess }: ChannelJoinButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleJoinSuccess = () => {
    setIsDialogOpen(false);
    onJoinSuccess();
  };

   if (!channel) {
    return null;
  }
  
  return (
    <>
      <Button className={S.button}
        onClick={(e) => {
          e.stopPropagation();
          setIsDialogOpen(true);
        }}
      >
        참여
      </Button>

      <ChannelJoinDialog 
        channel={channel} 
        onJoinSuccess={handleJoinSuccess}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};

export default ChannelJoinButton;