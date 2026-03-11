import React, { useState, KeyboardEvent } from "react";
import { useField, ErrorMessage } from "formik";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface IInputMultiValue {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
}

const FormMultiValueInput: React.FC<IInputMultiValue> = ({
  name,
  label,
  placeholder = "Type and press Enter",
  className,
  wrapperClassName,
  labelClassName,
  disabled,
}) => {
  const [field, meta, helpers] = useField<string[]>(name);
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const value = inputValue.trim();
    if (!value) return;
    if (field.value?.includes(value)) return;

    helpers.setValue([...(field.value || []), value]);
    setInputValue("");
  };

  const removeTag = (index: number) => {
    const tags = [...(field.value || [])];
    tags.splice(index, 1);
    helpers.setValue(tags);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const getBorderClass = () => {
    if (meta.touched && meta.error) return "border-error";
    if (meta.touched && !meta.error) return "border-gray-300";
    return "border-gray-200";
  };

  return (
    <div className={cn("flex flex-col gap-2", wrapperClassName)}>
      <label className={cn("typography-input-label", labelClassName)}>
        {label}
      </label>

      <div
        className={cn(
          "flex flex-wrap gap-2 px-3 py-2 border rounded-[10px] focus-within:outline-gray-500",
          getBorderClass(),
          disabled && "cursor-not-allowed opacity-60",
          className,
        )}
      >
        {field.value?.map((tag, index) => (
          <span
            key={index}
            className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="text-gray-500 hover:text-red-500"
              >
                <X size={14} />
              </button>
            )}
          </span>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none min-w-30 text-sm"
        />
      </div>

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default FormMultiValueInput;
