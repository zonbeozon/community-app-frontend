import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import { useGlobalSubscriptions } from '@/stomp/hooks/useGlobalSubscriptions';
import * as S from "./Layout.styles";

interface LayoutProps {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {

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

export default Layout;