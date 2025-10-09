import { MAX_CHANNEL_TITLE_LENGTH, MIN_CHANNEL_TITLE_LENGTH, MAX_CHANNEL_DESCRIPTION_LENGTH } from '@/constants/config';

export const section = "my-4";
export const inputGroupMargin = "mt-6 ";
export const labelMargin = "mb-3";
export const moreLabelMargin = "mb-1";

export const imageLabel = "block w-16 h-16 rounded-full bg-muted hover:bg-accent rounded cursor-pointer overflow-hidden border border-gray-300 flex-shrink-0"; 
export const imageWrapper = "relative pt-3 flex items-center justify-between gap-4 rounded-full" ;
export const imagePreview = "w-13 h-13 rounded-full object-cover border border-gray-300 rounded";
export const imageFallback = "w-full h-full flex items-center justify-center text-muted-foreground text-xl font-bold";

export const errorMessage = "text-sm text-red-500 my-2 border border-red-300 px-3 py-3 bg-red-50";

export const titleCount = (length: number) =>
  `text-sm text-right mt-1 ${length > MAX_CHANNEL_TITLE_LENGTH || length < MIN_CHANNEL_TITLE_LENGTH ? "text-red-500" : "text-muted-foreground"}`;

export const descriptionCount = (length: number) =>
   `text-sm text-right mt-1 ${length > MAX_CHANNEL_DESCRIPTION_LENGTH ? "text-red-500" : "text-muted-foreground"}`;

export const radioGroupClass = "flex flex-col sm:flex-row gap-4 pt-3";
export const radioOptionClass = "flex items-center space-x-2 p-3 rounded-md flex-grow";

export const radioItemSize = "w-5 h-5";

export const hoverIcon = "w-4 h-4 text-gray-500";
export const hoverContent = "w-64 text-sm text-muted-foreground";
export const hoverErrorContent = "w-auto p-2";

export const submitButtonClass = "w-full mt-6";

export const fadeInOut = "transition-[opacity,max-height] duration-300 ease-in-out overflow-hidden";
export const show = "opacity-100 max-h-96";
export const hide = "opacity-0 max-h-0";
export const radioItem = "flex items-center space-x-2";