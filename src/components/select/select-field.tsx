import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  touched,
  isRequired = true,
  className,
  disabled = false,
  isClearable = false,
}: {
  label?: string;
  name: string;
  value?: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder: string;
  error?: string;
  touched?: boolean;
  isRequired?: boolean;
  className?: string;
  disabled?: boolean;
  isClearable?: boolean;
}) => {
  return (
    <div className="flex flex-col space-y-2 relative">
      {label && (
        <label className="typography-paragraph-small font-medium text-text-500">
          {label} {isRequired && <span className="text-error">*</span>}
        </label>
      )}
      <Select
        disabled={disabled}
        value={value || ""}
        onValueChange={(val) => {
          if (val) {
            onChange(val);
          }
        }}
      >
        <SelectTrigger className={cn("h-12 bg-white w-full p-5 ", className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        {/* in this change is made */}
        <SelectContent className="max-h-[40vh] overflow-auto">
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="focus:bg-green-50 rounded-none focus:text-green-500 text-text-500 typography-paragraph-small px-[0.62rem] py-[0.5rem] h-fit"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isClearable && value && (
        <X
          className="absolute right-11 top-[39px] h-5 w-6 p-0 text-gray-400 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onChange("");
          }}
        >
          <X className="h-4 w-4" />
        </X>
      )}
      {isRequired && touched && error && (
        <div className="typography-paragraph-small text-error">{error}</div>
      )}
    </div>
  );
};

export default SelectField;
