import { useField, useFormikContext } from "formik";
import React, { useRef, useState } from "react";
import dropdownIcon from "@/assets/icons/dropdown.svg";
import uploadIcon from "@/assets/icons/upload.svg";
import closeIcon from "@/assets/icons/close_modal.svg";

interface IRadio {
  name: string;
  label: string;
  className?: string;
  labelClassName?: string;
  radioGroupClassName?: string;
  radioOptionClassName?: string;
  errorClassName?: string;
}

interface ISelect {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  className?: string;
  labelClassName?: string;
  selectClassName?: string;
  errorClassName?: string;
}

interface IInputDate {
  name: string;
  label: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

interface IInputTime {
  name: string;
  label: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}
interface IInputFile {
  name: string;
  label: string;
  className?: string;
  labelClassName?: string;
  dropAreaClassName?: string;
  errorClassName?: string;
  previewClassName?: string;
}

export const InputRadio: React.FC<IRadio> = ({
  name,
  label,
  className = "flex flex-col gap-2",
  labelClassName = "typography-p2-regular text-Black-500",
  radioGroupClassName = "flex gap-4",
  radioOptionClassName = "flex items-center gap-2",
  errorClassName = "typography-p2-regular text-red-500",
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (value: boolean) => {
    helpers.setValue(value);
    helpers.setTouched(true);
  };

  return (
    <div className={className}>
      <label className={labelClassName} htmlFor={name}>
        {label}
      </label>

      <div className={radioGroupClassName} role="group">
        <div className={radioOptionClassName}>
          <input
            id={`${name}-yes`}
            type="radio"
            checked={field.value === true}
            onChange={() => handleChange(true)}
          />
          <label htmlFor={`${name}-yes`}>Yes</label>
        </div>

        <div className={radioOptionClassName}>
          <input
            id={`${name}-no`}
            type="radio"
            checked={field.value === false}
            onChange={() => handleChange(false)}
          />
          <label htmlFor={`${name}-no`}>No</label>
        </div>
      </div>

      {meta.touched && meta.error && (
        <p className={errorClassName}>{meta.error}</p>
      )}
    </div>
  );
};

export const InputSelect: React.FC<ISelect> = ({
  name,
  label,
  options,
  className = "flex flex-col gap-2 relative",
  labelClassName = "typography-p2-regular text-Black-500",
  selectClassName = "p-3 typography-p2-regular text-Black-200 border rounded-lg bg-form-color appearance-none w-full",
  errorClassName = "typography-p2-regular text-red-500",
}) => {
  const [field, meta] = useField(name);

  const getBorderClass = () => {
    if (meta.touched && meta.error) return "border-error";
    if (meta.touched && !meta.error) return "border-Black-100";
    return "border-Black-200";
  };

  return (
    <div className={className}>
      <label className={labelClassName} htmlFor={name}>
        {label}
      </label>

      <div className="relative">
        <select
          id={name}
          {...field}
          className={`${selectClassName} ${getBorderClass()}`}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Dropdown Icon */}
        {dropdownIcon && (
          <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2">
            <img src={dropdownIcon} alt="Dropdown Icon" />
          </div>
        )}
      </div>

      {meta.touched && meta.error && (
        <p className={errorClassName}>{meta.error}</p>
      )}
    </div>
  );
};

export const InputDate: React.FC<IInputDate> = ({
  name,
  label,
  className = "flex flex-col gap-2",
  labelClassName = "typography-p2-regular text-Black-500",
  inputClassName = "w-full p-3 bg-form-color typography-p2-medium text-Black-500 rounded-lg border",
  errorClassName = "typography-p2-regular text-red-500",
}) => {
  const [field, meta] = useField(name);

  const getBorderClass = () => {
    if (meta.touched && meta.error) return "border-error";
    if (meta.touched && !meta.error) return "border-Black-100";
    return "border-Black-200";
  };

  return (
    <div className={className}>
      <label className={labelClassName} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type="date"
        className={`${inputClassName} ${getBorderClass()}`}
        {...field}
      />
      {meta.touched && meta.error && (
        <p className={errorClassName}>{meta.error}</p>
      )}
    </div>
  );
};

export const InputTime: React.FC<IInputTime> = ({
  name,
  label,
  className = "flex flex-col gap-2",
  labelClassName = "typography-p2-regular text-Black-500",
  inputClassName = "w-full p-3 bg-form-color typography-p2-medium text-Black-500 rounded-lg border",
  errorClassName = "typography-p2-regular text-red-500",
}) => {
  const [field, meta] = useField(name);

  const getBorderClass = () => {
    if (meta.touched && meta.error) return "border-error";
    if (meta.touched && !meta.error) return "border-Black-100";
    return "border-Black-200";
  };

  return (
    <div className={className}>
      <label className={labelClassName} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type="time"
        className={`${inputClassName} ${getBorderClass()}`}
        {...field}
      />
      {meta.touched && meta.error && (
        <p className={errorClassName}>{meta.error}</p>
      )}
    </div>
  );
};

export const InputFile: React.FC<IInputFile> = ({
  name,
  label,
  className = "flex flex-col gap-2",
  labelClassName = "typography-p2-regular",
  dropAreaClassName = "w-full h-28 border border-dashed rounded-lg border-Black-100 px-2.5 py-5 bg-Black-100/20",
  errorClassName = "typography-p2-regular text-red-500",
  previewClassName = "w-12",
}) => {
  const [, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFieldValue(name, file);
      setUploadedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDeleteFile = () => {
    setFieldValue(name, null);
    setUploadedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      <label className={labelClassName} htmlFor={name}>
        {label}
      </label>

      <label htmlFor={name} className={dropAreaClassName}>
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <img src={uploadIcon} alt="Upload" />
          <p className="typography-caption-c1 text-Black-200">
            Drag and Drop or{" "}
            <span className="text-primary underline">Choose file</span> to
            upload
          </p>
          <p className="typography-caption-c3 text-Black-200">
            SVG, PNG, JPG or GIF (max.10MB)
          </p>
        </div>
      </label>

      <input
        id={name}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
      />

      {uploadedFile && (
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col items-start gap-1">
            <img
              src={previewUrl ?? ""}
              alt="Preview"
              className={previewClassName}
            />
            <p className="typography-caption-c2 text-Black-200">
              {uploadedFile.name}
            </p>
          </div>
          <div onClick={handleDeleteFile} className="px-4 py-2 cursor-pointer">
            <img src={closeIcon} alt="Delete" />
          </div>
        </div>
      )}

      {meta.touched && meta.error && (
        <p className={errorClassName}>{meta.error}</p>
      )}
    </div>
  );
};
