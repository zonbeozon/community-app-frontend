import { PropsWithChildren } from "react";

export type Errors<T> = Partial<Record<keyof T, string | undefined>>;

export type Validator<T> = (values: T) => Errors<T>;

export type FormHandler<T> = {
  onChange: T extends string
    ? (value: string) => void
    : <K extends keyof T>(field: K, value: T[K]) => void;
};

export interface ValidationResult<T> {
  errors: Errors<T>;
  isValid: boolean;
};

export type FormProps<TContent, TPreview> = PropsWithChildren<{
  content: TContent;
  errors: Errors<TContent>;
  handler: FormHandler<TContent>;
  imagePreview: TPreview;
  isEdit: boolean;
  isValid: boolean;
  onSubmit: (data: TContent, previewUrl: TPreview) => void;
}>;