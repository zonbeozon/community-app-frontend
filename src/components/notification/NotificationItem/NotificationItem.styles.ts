const menuItemBase = 'flex flex-col items-start cursor-pointer transition-colors hover:bg-muted/50 focus:bg-muted/50';

const readStyle = 'opacity-60';

export const menuItem = ({ isRead }: { isRead: boolean }): string => {
  return `${menuItemBase} ${isRead ? readStyle : ''}`;
};

export const messageText = 'font-medium text-sm whitespace-normal';

export const timestampText = 'text-xs text-muted-foreground mt-1';
