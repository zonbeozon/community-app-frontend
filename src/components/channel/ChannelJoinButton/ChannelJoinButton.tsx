import { ChannelJoinDialog } from '@/components/channel/ChannelJoinDialog/ChannelJoinDialog';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useDialog } from '@/hooks/common/useDialog';
import type { ChannelJoinButtonProps } from '@/types/channel.type';
import * as S from './ChannelJoinButton.styles';

export const ChannelJoinButton = ({ channel, onJoinSuccess }: ChannelJoinButtonProps) => {
  const { open, close, props: dialogProps } = useDialog();

  const handleJoinSuccess = () => {
    close();
    onJoinSuccess();
  };

  if (!channel) {
    return null;
  }

  if (channel.channelInfo.settings.joinPolicy === 'DENY') {
    return (
      <HoverCard openDelay={10} closeDelay={10}>
        <HoverCardTrigger>
          <Button className={S.button} disabled>
            참여 불가
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="text-sm text-red-500">이 채널은 참가가 허용되지 않습니다.</HoverCardContent>
      </HoverCard>
    );
  }

  return (
    <>
      <Button className={S.button} onClick={open}>
        참여
      </Button>

      <ChannelJoinDialog {...dialogProps} channel={channel} onJoinSuccess={handleJoinSuccess} />
    </>
  );
};
