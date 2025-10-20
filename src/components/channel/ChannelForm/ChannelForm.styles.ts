import { MAX_CHANNEL_TITLE_LENGTH, MIN_CHANNEL_TITLE_LENGTH, MAX_CHANNEL_DESCRIPTION_LENGTH } from "@/constants/config";

export const section = "mb-6";

export const inputGroupMargin = "mb-5";

export const submitButtonContainer = "flex justify-end mt-6";

export const formTitle = "text-2xl font-bold mb-8";

export const titleCount = (length: number) =>
  `text-sm text-right mt-1 ${length > MAX_CHANNEL_TITLE_LENGTH || length < MIN_CHANNEL_TITLE_LENGTH ? "text-destructive" : "text-muted-foreground"}`;

export const descriptionCount = (length: number) =>
  `text-sm text-right mt-1 ${length > MAX_CHANNEL_DESCRIPTION_LENGTH ? "text-destructive" : "text-muted-foreground"}`;

export const labelMargin = "mb-6 block";

export const inputField = "resize-none mt-3";

export const radioGroupClass = "flex gap-4 mt-2";

export const radioLabel = "flex items-center gap-2 cursor-pointer font-normal";

export const errorList = "list-disc pl-4 text-destructive text-sm";