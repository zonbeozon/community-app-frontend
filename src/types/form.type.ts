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

export interface FormProps<T, P = null> {
  content: T;
  errors: Errors<T>;
  handler: FormHandler<T>;
  isEdit: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  imagePreview: P;
  onSubmit: (data: T, imageFile?: File | null) => void; 
}