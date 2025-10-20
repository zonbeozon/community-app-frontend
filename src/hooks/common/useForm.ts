import { useState, useCallback, useMemo } from "react";
import type { Errors, Validator, FormHandler } from "@/types/form.type";

const useForm = <T extends object | string>(
  initialState: T,
  validate: Validator<T>
) => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Errors<T>>(() => validate(initialState));
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const onChange = useCallback((...args: any[]) => {
    setValues(currentValues => {
      let newValues: T;

      if (typeof currentValues === 'string' && args.length === 1 && typeof args[0] === 'string') {
        newValues = args[0] as T;
      } else if (typeof currentValues === 'object' && args.length === 2 && typeof args[0] === 'string') {
        const [field, value] = args as [keyof T, T[keyof T]];
        newValues = { ...(currentValues as object), [field]: value } as T;
      } else {
        return currentValues;
      }
      
      setErrors(validate(newValues));
      return newValues;
    });
  }, [validate]);

  const handler = useMemo(() => ({
    onChange: onChange as FormHandler<T>['onChange'],
  }), [onChange]);

  const reset = useCallback(() => {
    setValues(initialState);
    setErrors(validate(initialState));
    setIsSubmitting(false); 
  }, [initialState, validate]);

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => Promise<void> | void) => 
    async () => {

      const currentErrors = validate(values);
      setErrors(currentErrors);

      if (Object.keys(currentErrors).length === 0) {
        setIsSubmitting(true);
        try {
          await onSubmit(values); 
        } catch (error) {
          console.error("폼 제풀 에러:", error);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [validate, values]
  );

  const setValuesDirectly = useCallback((newValues: T) => {
    setValues(newValues);
    setErrors(validate(newValues));
  }, [validate]);

  return {
    values,
    errors,
    handler,
    reset,
    isValid,
    setValues: setValuesDirectly,
    setErrors,
    isSubmitting,
    handleSubmit,
  };
};

export default useForm;