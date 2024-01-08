import { useEffect, useState } from "react";

export interface FormErrors {
  [key: string]: string;
}

export type ErrorHandler<T> = (values: T) => FormErrors;
type IsValid<T> = {
  [K in keyof T]: boolean;
};
export const useForm = <T extends object>(options: {
  initialValues: T;
  errorHandler?: ErrorHandler<T>;
  onSubmit: (values: T) => void;
  noReset?: boolean;
}) => {
  const [values, setValues] = useState<T>(options.initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitCount, setSubmitCount] = useState<number>(0);

  const handleChange = (fieldName: keyof T, value: any) => {
    setValues({
      ...values,
      [fieldName]: value,
    });
  };

  const resetForm = () => {
    setSubmitCount(0);
    setValues(options.initialValues);
  };

  const handleSubmit = () => {
    setSubmitCount(submitCount + 1);
    if (!Object.keys(errors).length) {
      options.onSubmit(values);
      if (!options.noReset) {
        resetForm();
      }
    }
  };

  const validate = () => {
    const validationErrors = options?.errorHandler?.(values);
    if (validationErrors) {
      setErrors(validationErrors);
    }
  };

  const isInvalid = Object.keys(errors).reduce(
    (acc: IsValid<T>, key: keyof typeof errors) => {
      acc[key as keyof typeof acc] = !!(submitCount && !!errors[key]);
      return acc;
    },
    {} as IsValid<T>
  );

  useEffect(() => {
    validate();
  }, [values]);

  return {
    values,
    handleChange,
    errors,
    handleSubmit,
    submitCount,
    isInvalid,
    resetForm,
  };
};
