import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { ChannelMember } from "@/types/channelMember.type";
import * as S from "./ChannelMemberInfoDialog.styles";
import { Button } from "@/components/ui/button"; 

interface ChannelMemberInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelMember: ChannelMember | null;
}

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
          <img
            src={profile?.imageUrl}
            alt={`${username || "알 수 없는 사용자"}의 프로필 사진`}
            className={S.avatar}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className={S.dialogContent}>
        <DialogHeader>
          <DialogTitle>유저 프로필</DialogTitle>
        </DialogHeader>
        <div className={S.content}>
          <img
            src={profile?.imageUrl}
            alt={`${username || "알 수 없는 사용자"}의 프로필 사진`}
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