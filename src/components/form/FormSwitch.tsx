import { Switch } from "../ui/switch";
import { useField } from "formik";

interface InputSwitchFieldProps {
  name: string;
  title: string;
  isRequired?: boolean;
  activeText?: string;
  inActiveText?: string;
  onChange?: (checked: boolean) => void;
}

const FormSwitch = ({
  name,
  title,
  isRequired,
  activeText = "Active",
  inActiveText = "Inactive",
  onChange,
}: InputSwitchFieldProps) => {
  const [field, meta, helpers] = useField<boolean>(name);

  const value = Boolean(field.value);

  const handleChange = (checked: boolean) => {
    helpers.setValue(checked);
    onChange?.(checked);
  };

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="typography-input-label">
        {title} {isRequired && <span className="text-error">*</span>}
      </label>

      <div className="flex items-center space-x-4 mt-3">
        <Switch
          id={name}
          checked={value}
          onBlur={() => helpers.setTouched(true)}
          onCheckedChange={handleChange}
        />

        <label htmlFor={name} className="-ml-2 typography-input-value">
          {value ? activeText : inActiveText}
        </label>
      </div>

      {meta.touched && meta.error && (
        <p className="text-red-500 typography-paragraph-small">{meta.error}</p>
      )}
    </div>
  );
};

export default FormSwitch;
