import { useCallback, useState } from 'react';

export const useDialog = (onClose?: () => void) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const onOpenChange = useCallback(
    (openState: boolean) => {
      setIsOpen(openState);
      if (!openState) {
        onClose?.();
      }
    },
    [onClose],
  );

  return {
    open,
    close,
    props: {
      open: isOpen,
      onOpenChange,
    },
  };
};
