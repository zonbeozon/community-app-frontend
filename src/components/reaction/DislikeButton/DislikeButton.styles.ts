export const wrapper = "flex items-center gap-1";

export const button = `
  flex h-8 w-8 items-center justify-center rounded-full 
  text-gray-500 
  transition-colors
  hover:bg-gray-200 
  dark:hover:bg-gray-800
  cursor-pointer
`;

export const icon = (isDisliked: boolean): string => {
  return isDisliked ? 'text-black fill-current' : 'text-gray-500';
};

export const count = (isDisliked: boolean): string => {
  return `text-sm ${isDisliked ? 'text-black' : 'text-gray-500'}`;
};

export const iconSize = 16;