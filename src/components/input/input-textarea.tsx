import { Label } from "../ui/label";
import { FormikValues, useFormikContext } from "formik";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

interface InputTextAreaFieldProps<T extends FormikValues> {
  name: keyof T;
  type?: string;
  placeholder: string;
  title: string;
  isRequired?: boolean;
  className?: string;
}

const InputTextArea = <T extends FormikValues>({
  name,
  placeholder,
  title,
  className,
  isRequired = false,
}: InputTextAreaFieldProps<T>) => {
  const formik = useFormikContext<T>();
  const touched = formik.touched?.[name];
  const error = formik.errors?.[name];

  return (
    <div className="space-y-2">
      <Label
        htmlFor={String(name)}
        className="typography-paragraph-small font-medium text-text-500"
      >
        {title} {isRequired && <span className="text-error">*</span>}
      </Label>

      <Textarea
        id={String(name)}
        name={String(name)}
        value={
          formik.values[name] as string | number | readonly string[] | undefined
        }
        placeholder={placeholder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={cn(
          "h-[7rem] border-boarder-300 bg-background-100 rounded-[8px] focus-visible:border-green-500 focus-visible:ring-0",
          className
        )}
      />

      <div className="  flex justify-between">
        {(formik?.values[name]?.length ?? 0) > 500 && touched && error && (
          <p className="text-red-500 text-sm">{error as string}</p>
        )}
        <p className="text-[#959595] text-sm flex justify-end font-normal">
          {formik.values[name]?.length || 0}/500
        </p>
      </div>

      {}
    </div>
  );
};

export default InputTextArea;