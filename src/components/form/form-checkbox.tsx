import React from "react";
import { ErrorMessage, useField } from "formik";

interface ICheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  className?: string;
  labelClassName?: string;
  containerClassName?: string;
}

const FormCheckbox: React.FC<ICheckbox> = ({
  name,
  label,
  labelClassName = "",
  className = "",
  containerClassName = "",
  ...props
}) => {
  const [field, meta, helpers] = useField<boolean>(name);

  const getBorderClass = () => {
    if (meta.touched && meta.error) return "border-error";
    if (meta.touched && !meta.error) return "border-Black-100";
    return "border-Black-200";
  };

  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      <div className="flex items-center gap-3">
        <input
          id={name}
          type="checkbox"
          className={`w-3 h-3 rounded border-2 bg-form-color focus:ring-0 ${getBorderClass()} ${className}`}
          checked={Boolean(field.value)}
          onChange={(e) => helpers.setValue(e.target.checked)}
          onBlur={field.onBlur}
          {...props}
        />

        <label
          className={`typography-input-label ${labelClassName}`}
          htmlFor={name}
        >
          {label}
        </label>
      </div>

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default FormCheckbox;
