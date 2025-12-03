export const wrapper = 'flex items-center gap-1';

export const button = `
  flex h-8 w-8 items-center justify-center rounded-full 
  text-gray-500 
  transition-colors
  hover:bg-gray-200 
  dark:hover:bg-gray-800
  cursor-pointer
`;

export const icon = (isLiked: boolean): string => {
  return isLiked ? 'text-black fill-current' : 'text-gray-500';
};

export const count = (isLiked: boolean): string => {
  return `text-sm ${isLiked ? 'text-black' : 'text-gray-500'}`;
};

export const iconSize = 16;
