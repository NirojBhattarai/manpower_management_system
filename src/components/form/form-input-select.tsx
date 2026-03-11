import { useField } from "formik";
import Select from "react-select";
import { ComponentProps } from "react";
import { ErrorMessage } from "formik";

export interface IOption<T = string | number> {
  label: string;
  value: T;
}

interface IReactSelect extends ComponentProps<"input"> {
  name: string;
  label: string;
  options: IOption[];
  className?: string;
  labelClassName?: string;
}

const FormInputSelect: React.FC<IReactSelect> = ({
  name,
  label,
  options,
  className,
  labelClassName,
  disabled,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);

  const getBorderClass = () => {
    if (meta.touched && meta.error) {
      return "border-error";
    }
    if (meta.touched && !meta.error) {
      return "#d1d5dc";
    }
    return "#e5e7eb";
  };

  const selectedOption =
    options?.find((opt) => opt.value === field.value) || null;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        className={`typography-input-label ${labelClassName}`}
        htmlFor={name}
      >
        {label}
      </label>

      <Select
        id={name}
        instanceId={name}
        options={options}
        value={selectedOption}
        onChange={(option) => helpers.setValue((option as any)?.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={placeholder}
        isSearchable
        isDisabled={disabled}
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: "36px",
            height: "36px",
            borderRadius: "8px",
            borderColor: state.isFocused ? "#6a7282" : "#e5e7eb",
            boxShadow: state.isFocused ? "0 0 0 1px #6a7282" : "none",
            fontSize: "12px",
            fontWeight: 400,
            "&:hover": {
              borderColor: getBorderClass(),
            },
          }),

          valueContainer: (base) => ({
            ...base,
            padding: "0 10px",
          }),

          input: (base) => ({
            ...base,
            margin: 0,
            padding: 0,
            fontSize: "12px",
          }),

          singleValue: (base) => ({
            ...base,
            fontSize: "12px",
            color: "#1e2939",
          }),

          placeholder: (base) => ({
            ...base,
            fontSize: "11px",
            color: "#9ca3af",
            fontWeight: 400,
          }),

          menu: (base) => ({
            ...base,
            borderRadius: "8px",
            fontSize: "12px",
            zIndex: 20,
          }),

          option: (base, state) => ({
            ...base,
            fontSize: "12px",
            padding: "8px 10px",
            backgroundColor: state.isSelected
              ? "#a4b4f5"
              : state.isFocused
                ? "#c8d2fa"
                : "white",
            color: "#111827",
            cursor: "pointer",
          }),

          indicatorsContainer: (base) => ({
            ...base,
            height: "36px",
          }),

          dropdownIndicator: (base) => ({
            ...base,
            padding: "6px",
          }),

          clearIndicator: (base) => ({
            ...base,
            padding: "6px",
          }),
        }}
      />

      <ErrorMessage
        name={name}
        component="div"
        className="border-gray-200 text-red-500 text-sm"
      />
    </div>
  );
};

export default FormInputSelect;
