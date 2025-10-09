import { useState, useCallback } from "react";

const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    open,
    close,
    props: {
      open: isOpen,
      onOpenChange: setIsOpen,
    },
  };
};

export default useDialog;