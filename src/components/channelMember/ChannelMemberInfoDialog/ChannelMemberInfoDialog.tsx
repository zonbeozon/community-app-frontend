import { ChannelMemberProfileImage } from '@/components/channelmember/ChannelMemberProfileImage/ChannelMemberProfileImage';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useDialog } from '@/hooks/common/useDialog';
import type { ChannelMember } from '@/types/channelMember.type';
import * as S from './ChannelMemberInfoDialog.styles';

export const ChannelMemberInfoDialog = ({ channelMember }: { channelMember: ChannelMember }) => {
  const { props: dialogProps } = useDialog();

  if (!channelMember) {
    return null;
  }

  const { profile, username } = channelMember;

  return (
    <Dialog {...dialogProps}>
      <DialogTrigger asChild>
        <ChannelMemberProfileImage profile={profile} username={username} className={S.avatar} />
      </DialogTrigger>
      <DialogContent className={S.dialogContent}>
        <DialogHeader>
          <DialogTitle>유저 프로필</DialogTitle>
        </DialogHeader>
        <div className={S.content}>
          <ChannelMemberProfileImage profile={profile} username={username} className={S.bigImg} />
          <h2 className={S.username}>{username}</h2>
          <div>
            <DialogClose asChild>
              <Button type="button" variant="ghost" className={S.closeButton}>
                닫기
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
