import { MAX_POST_CONTENT_LENGTH } from "@/constants/constants";

export const wrapper = "p-4";

export const title = "text-2xl font-bold mb-6";

export const imageContainer = "mb-6 flex items-start gap-4";

export const previewWrapper = "flex flex-wrap gap-2 max-w-[calc(100%-150px)]";

export const previewPlaceholder = "w-16 h-16 rounded border bg-gray-100 flex items-center justify-center text-gray-400 text-xs";

export const previewPlaceholderIcon = "w-6 h-6 text-muted-foreground";

export const previewItem = "relative group w-24 h-24";

export const previewImage = "w-full h-full object-cover rounded border";

export const removeButton = "absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs rounded-full p-1 hidden group-hover:block";

export const removeIconSize = 14;

export const uploadControlsContainer = "flex flex-col items-start";

export const uploadLabel = (isMaxReached: boolean, uploading: boolean): string => {
  const base = "px-4 py-2 bg-white border border-gray-300 text-sm rounded-md cursor-pointer hover:bg-gray-50 transition";
  const disabled = "cursor-not-allowed opacity-60";
  return `${base} ${isMaxReached || uploading ? disabled : ""}`;
};

export const uploadLimitError = "text-sm text-destructive";

export const uploadCountText = "text-xs text-muted-foreground mt-4";

export const uploadErrorText = "text-sm text-red-600 mt-1";

export const contentContainer = "mb-2";

export const textarea = "w-full resize-none rounded border px-3 py-2 text-sm";

export const contentCount = (length: number): string =>
  `text-sm text-right mt-1 ${length > MAX_POST_CONTENT_LENGTH || length <= 0 ? "text-red-500" : "text-muted-foreground"}`;

export const submitErrorList = "list-disc pl-4 text-destructive text-sm";