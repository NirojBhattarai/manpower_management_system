import { cn } from "@/lib/utils";
import { useField } from "formik";
import { ComponentProps } from "react";

interface ITextArea extends ComponentProps<"textarea"> {
  name: string;
  label: string;
  placeholder?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  textareaClassName?: string;
  errorClassName?: string;
  rows?: number;
  required?: boolean;
}

const FormInputTextArea: React.FC<ITextArea> = ({
  name,
  label,
  placeholder,
  className,
  wrapperClassName,
  rows = 4,
  required,
  ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <div className={cn(`flex flex-col gap-2`, wrapperClassName)}>
      <label htmlFor={name} className="typography-input-label">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <textarea
        id={name}
        className={`w-full p-3 typography-input-label rounded-lg border ${className} `}
        placeholder={placeholder}
        rows={rows}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <p className={`text-red-500 italic`}>{meta.error}</p>
      )}
    </div>
  );
};
export default FormInputTextArea;
