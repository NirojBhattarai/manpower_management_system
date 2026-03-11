import React from "react";
import { ErrorMessage, useField } from "formik";
import { cn } from "@/lib/utils";

interface IInputText extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  className?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  errorMessageClassName?: string;
}

const FormInputText: React.FC<IInputText> = ({
  name,
  label,
  labelClassName,
  wrapperClassName,
  errorMessageClassName = "text-red-500",
  className,
  disabled,
  ...props
}) => {
  const [{ ...field }, meta] = useField(name);

  const getBorderClass = () => {
    if (meta.touched && meta.error) {
      return "border-error";
    }
    if (meta.touched && !meta.error) {
      return "border-gray-300";
    }
    return "border-gray-200";
  };

  return (
    <div className={cn(`flex flex-col gap-2`, wrapperClassName)}>
      <label
        className={`typography-input-label ${labelClassName}`}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        type="text"
        className={`w-full px-4 py-2 typography-input-value typography-input-placeholder rounded-[10px] border focus:outline-gray-500 ${
          disabled ? "cursor-not-allowed" : ""
        } ${className} ${getBorderClass()}`}
        disabled={disabled}
        {...field}
        {...props}
      />
      <ErrorMessage
        name={name}
        component="div"
        className={`${errorMessageClassName} text-sm`}
      />
    </div>
  );
};

export default FormInputText;
