import React from "react";
import { ErrorMessage, useField } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface InputDateProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  wrapperClassName?: string;
  disabled?: boolean;
}

const FormInputDate: React.FC<InputDateProps> = ({
  label,
  name,
  placeholder,
  required,
  disabled = false,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (date: Date | null) => {
    if (date) {
      // Format the date to yyyy-MM-dd
      const formattedDate = date.toISOString().split("T")[0]; // Get only the date part
      helpers.setValue(formattedDate);
    } else {
      helpers.setValue(null); // If date is cleared, set it to null
    }
  };

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
    <div className="flex flex-col gap-2 w-full">
      <label className="block typography-input-label">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <DatePicker
        selected={field.value ? new Date(field.value) : null}
        onChange={handleChange}
        onBlur={field.onBlur}
        placeholderText={placeholder}
        dateFormat="yyyy-MM-dd"
        className={`w-full px-4 py-2 border rounded-[10px] typography-input-value typography-input-placeholder ${getBorderClass()}`}
        wrapperClassName={`w-full`}
        disabled={disabled}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default FormInputDate;
