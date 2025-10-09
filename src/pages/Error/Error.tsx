import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import * as styles from './Error.styles';

const Error = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subTitle}>페이지를 불러오는 중 문제가 발생했습니다.</p>
      </div>
      <Link to="/">
        <Button aria-label="홈으로 이동">
          홈으로 이동
        </Button>
      </Link>
    </div>
  );
};

export default Error;
