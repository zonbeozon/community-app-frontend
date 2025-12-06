import { useNavigate } from 'react-router-dom';
import { serverMemberAtom } from '@/atoms/authAtoms';
import { useAtomValue } from 'jotai';
import { ChannelCreateDialog } from '@/components/channel/ChannelCreateDialog/ChannelCreateDialog';
import { ServerMemberInfoDialog } from '@/components/servermember/ServerMemberInfoDialog/ServerMemberInfoDialog';
import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks/common/useDialog';
import { ROUTE_PATH } from '@/constants/routePaths';
import { NotificationButton } from '../../notification/NotificationButton/NotificationButton';
// import ChannelSearchbar from "@/components/channel/ChannelSearchbar/ChannelSearchbar";
import * as S from './Header.styles';

export const Header = () => {
  const myInfo = useAtomValue(serverMemberAtom);
  const isAuthenticated = !!myInfo;

  const navigate = useNavigate();
  const { props: dialogProps } = useDialog();

  const handleMain = () => {
    navigate(ROUTE_PATH.main);
  };

  return (
    <div className={S.layout}>
      <Button onClick={handleMain} aria-label="메인 페이지로 이동" className={S.logoButton} variant="ghost">
        <h1 className={S.logo}>zonbeozon</h1>
      </Button>

      {isAuthenticated && (
        <div className={S.rightSection}>
          {/* <ChannelSearchbar /> */}
          <ChannelCreateDialog {...dialogProps} />
          <NotificationButton />
          <ServerMemberInfoDialog />
        </div>
      )}
    </div>
  );
};
