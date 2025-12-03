import { serverMemberAtom } from '@/atoms/authAtoms';
import { useAtomValue } from 'jotai';
import { SignOutButton } from '@/components/common/SignOutButton/SignOutButton';
import { ServerMemberName } from '@/components/servermember/ServerMemberName/ServerMemberName';
import { ServerMemberProfileImage } from '@/components/servermember/ServerMemberProfileImage/ServerMemberProfileImage';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDialog } from '@/hooks/common/useDialog';
import * as S from './ServerMemberInfoDialog.styles';

export const ServerMemberInfoDialog = () => {
  const { props: dialogProps } = useDialog();
  const serverMember = useAtomValue(serverMemberAtom);

  if (!serverMember) {
    return null;
  }

  const username = serverMember.username || '';
  const profile = serverMember.profile?.imageUrl || '';

  return (
    <Dialog {...dialogProps}>
      <DialogTrigger asChild>
        {profile ? (
          <img src={profile} alt={`${username}의 프로필`} className={S.triggerImage} />
        ) : (
          <div className={`${S.triggerImage}`}>{username ? username[0].toUpperCase() : '?'}</div>
        )}
      </DialogTrigger>

      <DialogContent className={S.dialogContent}>
        <DialogHeader>
          <DialogTitle>내 프로필</DialogTitle>
          <DialogDescription className="sr-only">서버 프로필을 확인하고 수정할 수 있습니다.</DialogDescription>
        </DialogHeader>

        <div className={S.contentWrapper}>
          <ServerMemberProfileImage />
          <ServerMemberName />

          <div className={S.buttonContainer}>
            <div>
              <SignOutButton />
            </div>
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
