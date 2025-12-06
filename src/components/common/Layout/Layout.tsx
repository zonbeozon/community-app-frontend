import { useGlobalSubscriptions } from '@/stomp/hooks/useGlobalSubscriptions';
import { Footer } from '@/components/common/Footer/Footer';
import { Header } from '@/components/common/Header/Header';
import type { LayoutProps } from '@/types/common.type';
import * as S from './Layout.styles';

export const Layout = ({ children }: LayoutProps) => {
  useGlobalSubscriptions();

  return (
    <div className={S.wrapper}>
      <Header />
      <div id="main-content" className={S.contentWrapper}>
        {children}
      </div>
      <Footer />
    </div>
  );
};
