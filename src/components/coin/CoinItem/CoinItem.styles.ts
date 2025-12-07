export const wrapper = 'relative group';

export const itemWrapper = (isSelected: boolean) => {
  const baseStyle = 'flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors relative';
  const hoverStyle = 'hover:bg-gray-100 dark:hover:bg-gray-800';
  const selectedStyle = 'bg-gray-200 dark:bg-gray-700 font-semibold text-foreground';

  return `${baseStyle} ${isSelected ? selectedStyle : hoverStyle}`;
};

const baseProfileImage = 'w-10 h-10 rounded-full object-cover flex-shrink-0 ';

export const profileImage = baseProfileImage;

export const profileImageFallback = `${baseProfileImage} flex items-center justify-center bg-gray-200 text-gray-500 font-bold text-lg dark:bg-gray-700 dark:text-gray-400`;

export const contentWrapper = 'flex-1 overflow-hidden';

export const title = 'truncate text-sm font-medium text-black dark:text-white';

export const latestChat = 'truncate text-xs text-gray-500 dark:text-gray-400 mt-0.5';

export const dropdownContainer =
  'absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity';

export const dropdownButtonWrapper = (isSelected: boolean) => {
  const baseStyle = 'flex h-8 w-8 items-center justify-center rounded-full transition-colors';
  const hoverStyle = isSelected ? 'hover:bg-black/10 dark:hover:bg-white/10' : 'hover:bg-gray-200 dark:hover:bg-gray-600';

  return `${baseStyle} ${hoverStyle}`;
};
