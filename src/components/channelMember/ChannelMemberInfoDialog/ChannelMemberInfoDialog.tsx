import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChannelMemberInfoDialogProps } from "@/types/channelMember.type";
import ChannelMemberProfileImage from "../ChannelMemberProfileImage/ChannelMemberProfileImage";
import useDialog from "@/hooks/common/useDialog";
import * as S from "./ChannelMemberInfoDialog.styles";

const ChannelMemberInfoDialog = ({ channelMember }: ChannelMemberInfoDialogProps) => {
  const { props: dialogProps } = useDialog();

  if (!channelMember) {
    return null;
  }

  const { profile, username } = channelMember;

  return (
    <Dialog {...dialogProps}>
      <DialogTrigger asChild>
          <ChannelMemberProfileImage
            profile={profile} 
            username={username} 
            className={S.avatar} 
          />
      </DialogTrigger>
      <DialogContent className={S.dialogContent}>
        <DialogHeader>
          <DialogTitle>유저 프로필</DialogTitle>
        </DialogHeader>
        <div className={S.content}>
          <ChannelMemberProfileImage
            profile={profile} 
            username={username} 
            className={S.bigImg} 
          />
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

export default ChannelMemberInfoDialog;