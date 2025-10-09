import { useEffect } from "react";
import usePostViewLogger from "@/hooks/viewLogger/usePostViewLogger";

/**
 * 애플리케이션 전체에서 주기적으로 포스트 조회수 큐를 서버에 전송하는 컴포넌트.
 * 이 컴포넌트는 App.tsx 등 최상단에 한 번만 렌더링되면 됩니다.
 */
export const ViewLoggerInitializer = () => {
  // 2. 훅을 호출하여 수동으로 flush를 실행하는 함수를 가져옵니다.
  const { manualFlush } = usePostViewLogger();

  useEffect(() => {
    // 3. 5초마다 manualFlush 함수를 호출하는 인터벌을 설정합니다.
    const interval = setInterval(() => {
      manualFlush();
    }, 5000); // 5초 (5000ms)

    // 컴포넌트가 언마운트될 때 인터벌을 정리하여 메모리 누수를 방지합니다.
    return () => clearInterval(interval);
  }, [manualFlush]);

  // 이 컴포o넌트는 UI를 렌더링하지 않습니다.
  return null;
};