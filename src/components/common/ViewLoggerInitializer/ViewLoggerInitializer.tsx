import { useEffect } from "react";
import usePostViewLogger from "@/hooks/viewLogger/usePostViewLogger";

export const ViewLoggerInitializer = () => {
  const { manualFlush } = usePostViewLogger();

  useEffect(() => {
    const interval = setInterval(() => {
      manualFlush();
    }, 5000);

    return () => clearInterval(interval);
  }, [manualFlush]);

  return null;
};
