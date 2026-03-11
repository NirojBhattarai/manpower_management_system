import { useField, useFormikContext } from "formik";
import { ComponentProps, useEffect, useRef, useState } from "react";
import uploadIcon from "../../assets/icons/upload.svg";
import { CircleX } from "lucide-react";

interface IInputFile extends ComponentProps<"input"> {
  name: string;
  label: string;
  labelClassName?: string;
  dropAreaClassName?: string;
}

export const InputFile: React.FC<IInputFile> = ({
  name,
  label,
  className,
  labelClassName,
  required,
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  /** -------------------------------
   * Handle File Change
   * ------------------------------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setFieldValue(name, file);
  };

  /** -------------------------------
   * Remove Selected File
   * ------------------------------- */
  const handleDeleteFile = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
    setFieldValue(name, null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /** -------------------------------
   * Sync initial Formik value
   * ------------------------------- */
  useEffect(() => {
    if (!field.value) return;

    if (field.value instanceof File) {
      setUploadedFile(field.value);
      setPreviewUrl(URL.createObjectURL(field.value));
    } else if (typeof field.value === "string") {
      setPreviewUrl(field.value);
    }
  }, [field.value]);

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <label
        className={`typography-label-text ${labelClassName}`}
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>

      {/* File Container */}
      <div
        className={`relative flex items-center w-full border rounded-lg cursor-pointer bg-white ${className}`}
        onClick={() => fileInputRef.current?.click()}
      >
        {/* Upload Area */}
        <div className="flex-1 flex flex-col items-center gap-1 px-3 py-5 text-center border-dashed border-r">
          <img src={uploadIcon} alt="Upload" />
          <p className="text-sm text-gray-600">
            <span className="text-primary underline">Choose file</span> to
            upload
          </p>
          <p className="text-xs text-gray-400">
            SVG, PNG, JPG or GIF (max 10MB)
          </p>
        </div>

        {/* Preview Area */}
        {previewUrl && (
          <div className="relative w-24 h-24 flex items-center justify-center p-1">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full rounded-md object-cover"
            />

            {/* Delete Icon */}
            <button
              type="button"
              onClick={handleDeleteFile}
              className="absolute -top-2 -right-2 bg-white rounded-full shadow p-0.5"
            >
              <CircleX size={16} className="text-red-500" />
            </button>

            {/* File Name */}
            {uploadedFile && (
              <p className="absolute -bottom-5 text-xs text-gray-600 w-full text-center truncate">
                {uploadedFile.name}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        id={name}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
      />

      {/* Validation Error */}
      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm italic">{meta.error}</p>
      )}
    </div>
  );
};
