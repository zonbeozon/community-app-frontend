import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { useAtomValue } from "jotai";
import { serverMemberAtom } from "@/atoms/authAtoms";
import LogOutButton from "@/components/common/SignOutButton/SignOutButton";
import useDialog from "@/hooks/common/useDialog";
import ServerMemberProfileImage from "../ServerMemberProfileImage/ServerMemberProfileImage";
import ServerMemberName from "../ServerMemberName/ServerMemberName";
import { Button } from "@/components/ui/button";
import * as S from "./ServerMemberInfoDialog.styles";

const ServerMemberInfoDialog = () => {
  const { props: dialogProps, close } = useDialog();
  const serverMember = useAtomValue(serverMemberAtom);

  if (!serverMember) {
    return null;
  }

  const username = serverMember.username || "";
  const profile = serverMember.profile?.imageUrl || "";

  return (
    <Dialog {...dialogProps}>
      <DialogTrigger asChild>
        {profile ? (
          <img src={profile} alt={`${username}의 프로필`} className={S.triggerImage} />
        ) : (
          <div className={`${S.triggerImage}`}>
            {username ? username[0].toUpperCase() : '?'}
          </div>
        )}
      </DialogTrigger>

      <DialogContent className={S.dialogContent}>
        <DialogHeader>
          <DialogTitle>내 프로필</DialogTitle>
          <DialogDescription className="sr-only">
            서버 프로필을 확인하고 수정할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className={S.contentWrapper}>
          <ServerMemberProfileImage />
          <ServerMemberName />

          <div className={S.buttonContainer}>
            <div><LogOutButton /></div>
            <DialogClose asChild>
              <Button type="button" variant="ghost" onClick={close} className={S.closeButton}>닫기</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServerMemberInfoDialog;