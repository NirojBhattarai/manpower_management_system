import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { FormikValues, useFormikContext } from "formik";
import { cn } from "@/lib/utils";

interface InputFieldProps<T extends FormikValues> {
  name: keyof T;
  type?: string;
  placeholder: string;
  title?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  className?: string;
}

const InputField = <T extends FormikValues>({
  name,
  type = "text",
  placeholder,
  title,
  isRequired = true,
  isDisabled = false,
  className,
}: InputFieldProps<T>) => {
  const formik = useFormikContext<T>();
  const touched = formik?.touched?.[name];
  const error = formik?.errors?.[name];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number") {
      const allowedKeys = [
        "Backspace",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
        "+",
        "-",
        " ",
      ];

      if (e.ctrlKey && ["c", "a", "v", "x"].includes(e.key.toLowerCase())) {
        return;
      }

      if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (type === "number") {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className="space-y-2">
      {title && (
        <Label
          htmlFor={String(name)}
          className="typography-paragraph-small font-medium text-text-500"
        >
          {title} {isRequired && <span className="text-error">*</span>}
        </Label>
      )}

      <Input
        disabled={isDisabled}
        id={String(name)}
        name={String(name)}
        type={type}
        placeholder={placeholder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={
          formik.values[name] as string | number | readonly string[] | undefined
        }
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        className={cn(
          "h-12 typography-paragraph-small border-boarder-300 focus-visible:border-green-500 focus-visible:ring-0 rounded-[8px]",
          className
        )}
      />
      {touched && error && (
        <p className="text-red-500 typography-paragraph-small">
          {error as string}
        </p>
      )}
    </div>
  );
};

export default InputField;