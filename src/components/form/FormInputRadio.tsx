import React from "react";
import { ErrorMessage, useField } from "formik";
import { cn } from "@/lib/utils";

interface IRadioOption {
  label: string;
  value: string | number;
}

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  options: IRadioOption[];
  className?: string;
  labelClassName?: string;
  optionLabelClassName?: string;
  containerClassName?: string;
  optionsWrapperClassName?: string;
}

const FormInputRadio: React.FC<IProps> = ({
  name,
  label,
  options,
  labelClassName,
  className,
  optionLabelClassName,
  containerClassName,
  optionsWrapperClassName,
  ...props
}) => {
  const [field, meta] = useField(name);

  const getBorderClass = () => {
    if (meta.touched && meta.error) {
      return "border-error";
    }
    if (meta.touched && !meta.error) {
      return "border-Black-100";
    }
    return "border-Black-200";
  };

  return (
    <div className={cn(`flex flex-col gap-2`, containerClassName)}>
      {label && (
        <label className={`typography-input-label w-24 ${labelClassName}`}>
          {label}
        </label>
      )}

      <div className={cn(`ml-4 flex flex-col gap-3`, optionsWrapperClassName)}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-3">
            <input
              id={`${name}-${option.value}`}
              type="radio"
              className={`size-3 rounded-full border-2 bg-form-color focus:ring-0 ${getBorderClass()} ${className}`}
              {...field}
              value={option.value}
              checked={field.value === option.value}
              {...props}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className={`typography-input-value ${optionLabelClassName}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default FormInputRadio;
