import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChannelMemberInfoDialogProps } from "@/types/channelMember.type";
import ChannelMemberProfileImage from "../ChannelMemberProfileImage/ChannelMemberProfileImage";
import * as S from "./ChannelMemberInfoDialog.styles";

const ChannelMemberInfoDialog = ({
  open,
  onOpenChange,
  channelMember,
}: ChannelMemberInfoDialogProps) => {

  if (!channelMember) {
    return null;
  }

  const { profile, username } = channelMember;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className={S.createButton}>
          <ChannelMemberProfileImage
            profile={profile} 
            username={username} 
            className={S.avatar} 
          />
        </Button>
      </DialogTrigger>
      <DialogContent className={S.dialogContent}>
        <DialogHeader>
          <DialogTitle>유저 프로필</DialogTitle>
        </DialogHeader>
        <div className={S.content}>
          <ChannelMemberProfileImage
            profile={profile} 
            username={username} 
            className={S.avatar} 
          />
          <h2 className={S.username}>{username || "알 수 없는 사용자"}</h2>
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