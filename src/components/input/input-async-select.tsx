import { useFormikContext, FormikValues } from "formik";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import AsyncSelectField from "../select/async-select";

interface OptionType {
  value: string;
  label: string;
}

interface InputAsyncSelectProps<T extends FormikValues> {
  name: keyof T;
  title?: string;
  placeholder?: string;
  loadOptions: (inputValue: string) => Promise<OptionType[]>;
  isClearable?: boolean;
  isRequired?: boolean;
  containerClassName?: string;
  onChange?: (value: OptionType | null) => void;
  showClearButton?: boolean;
}

const InputAsyncSelect = <T extends FormikValues>({
  name,
  title,
  placeholder = "Select",
  loadOptions,
  isClearable = true,
  isRequired = true,
  containerClassName,
  onChange,
  showClearButton,
}: InputAsyncSelectProps<T>) => {
  const formik = useFormikContext<T>();
  const touched = formik.touched[name];
  const error = formik.errors[name];

  const [selectedValue, setSelectedValue] = useState<OptionType | null>(null);

  useEffect(() => {
    const currentValue = formik.values[name];

    if (!currentValue) return;

    const fetchInitialValue = async () => {
      try {
        const options = await loadOptions("");
        const matched = options.find((opt) => opt.value === currentValue);

        if (matched) {
          setSelectedValue(matched);
        }
      } catch (error) {
        console.error("Failed to load options:", error);
      }
    };

    fetchInitialValue();
  }, [formik.values[name], loadOptions]);

  return (
    <div className={cn("space-y-2", containerClassName)}>
      {title && (
        <Label
          htmlFor={String(name)}
          className="typography-paragraph-small font-medium text-text-500"
        >
          {title} {isRequired && <span className="text-error">*</span>}
        </Label>
      )}

      <AsyncSelectField
        loadOptions={loadOptions}
        value={selectedValue}
        onChange={(option: OptionType | null) => {
          setSelectedValue(option);
          formik.setFieldValue(name as string, option?.value || "");
          onChange?.(option);
        }}
        showClearButton={showClearButton}
        placeholder={placeholder}
        isClearable={isClearable}
      />

      {touched && error && (
        <p className="text-red-500 typography-paragraph-small">
          {error as string}
        </p>
      )}
    </div>
  );
};

export default InputAsyncSelect;
