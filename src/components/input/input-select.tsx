import { useFormikContext, FormikValues } from "formik";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string | number;
}

interface InputSelectProps<T extends FormikValues> {
  name: keyof T;
  title: string;
  options: Option[];
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  className?: string;
}

const InputSelect = <T extends FormikValues>({
  name,
  title,
  options,
  placeholder = "Select",
  isRequired = true,
  isDisabled = false,
  className = "",
}: InputSelectProps<T>) => {
  const formik = useFormikContext<T>();
  const touched = formik.touched?.[name];
  const error = formik.errors?.[name];
  const value = formik.values[name] as string | number;

  return (
    <div className="space-y-2">
      <Label
        htmlFor={String(name)}
        className="typography-paragraph-small font-medium text-text-500"
      >
        {title} {isRequired && <span className="text-error">*</span>}
      </Label>

      <Select
        disabled={isDisabled}
        value={value !== undefined ? String(value) : ""}
        onValueChange={(val) => {
          if (val) {
            formik.setFieldValue(name as string, val);
          }
        }}
      >
        <SelectTrigger className={cn("h-12 bg-white w-full p-5 ", className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={String(opt.value)}
              className="focus:bg-green-50 rounded-none focus:text-green-500 text-text-500 typography-paragraph-small px-[0.62rem] py-[0.5rem] capitalize "
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {touched && error && (
        <p className="text-red-500 typography-paragraph-small">
          {error as string}
        </p>
      )}
    </div>
  );
};

export default InputSelect;