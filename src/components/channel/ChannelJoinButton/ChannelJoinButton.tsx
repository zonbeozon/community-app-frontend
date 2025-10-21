import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ChannelJoinDialog from '@/components/channel/ChannelJoinDialog/ChannelJoinDialog';
import { ChannelJoinButtonProps } from '@/types/channel.type';
import * as S from "./ChannelJoinButton.styles";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const ChannelJoinButton = ({ channel, onJoinSuccess }: ChannelJoinButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleJoinSuccess = () => {
    setIsDialogOpen(false);
    onJoinSuccess();
  };

  if (!channel) {
    return null;
  }

  if (channel.channelInfo.settings.joinPolicy === "DENY") {
    return (
      <HoverCard openDelay={10} closeDelay={10}>
        <HoverCardTrigger>
          <Button className={S.button} disabled>참여 불가</Button>
        </HoverCardTrigger>
        <HoverCardContent className='text-sm text-red-500'>
          이 채널은 참가가 허용되지 않습니다.
        </HoverCardContent>
      </HoverCard>
    );
  }

  return (
    <>
      <Button 
        className={S.button}
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