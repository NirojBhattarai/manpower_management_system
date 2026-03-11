import { useField, useFormikContext } from "formik";
import {
  ComponentProps,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";
import { CircleX, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface IPdfUpload extends ComponentProps<"input"> {
  name: string;
  label: string;
  labelClassName?: string;
  className?: string;
  wrapperClassName?: string;
  required?: boolean;
  handleDeleteRef?: React.RefObject<{
    reset: () => void;
  } | null>;
}

type PdfValue = File | string | null;

const FormInputPdf: React.FC<IPdfUpload> = ({
  name,
  label,
  className,
  labelClassName,
  wrapperClassName,
  required,
  handleDeleteRef,
}) => {
  const [field, meta] = useField<PdfValue>(name);
  const { setFieldValue } = useFormikContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedFile, setUploadedFile] = useState<PdfValue>(null);

  /* ---------------- Helpers ---------------- */

  const getFileName = (file: File | string) => {
    if (typeof file === "string") {
      return decodeURIComponent(file.split("/").pop() || "PDF File");
    }
    return file.name;
  };

  const openPdf = (file: File | string) => {
    const url = typeof file === "string" ? file : URL.createObjectURL(file);

    window.open(url, "_blank", "noopener,noreferrer");

    if (file instanceof File) {
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };

  /* ---------------- Handlers ---------------- */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setFieldValue(name, file);
  };

  const handleDeleteFile = () => {
    setUploadedFile(null);
    setFieldValue(name, null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ---------------- Sync Formik value ---------------- */

  useEffect(() => {
    if (field.value) {
      setUploadedFile(field.value);
    } else {
      setUploadedFile(null);
    }
  }, [field.value]);

  /* ---------------- Expose reset to parent ---------------- */

  useImperativeHandle(handleDeleteRef, () => ({
    reset: handleDeleteFile,
  }));

  /* ---------------- Render ---------------- */

  return (
    <div className={cn("flex flex-col gap-2", wrapperClassName)}>
      {/* Label */}
      <label
        htmlFor={name}
        className={cn("typography-input-label", labelClassName)}
      >
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>

      {/* Upload Box */}
      <div
        className={cn(
          "relative flex justify-between items-center w-full cursor-pointer",
          "border rounded-[10px] px-3 py-2 bg-white",
          className,
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        {/* Empty State */}
        {!uploadedFile && (
          <p className="text-[12px] text-gray-400 leading-[150%]">
            Click to upload PDF (max 10MB)
          </p>
        )}

        {/* Uploaded State */}
        {uploadedFile && (
          <div
            className="flex justify-between items-center w-full"
            onClick={(e) => {
              e.stopPropagation();
              openPdf(uploadedFile);
            }}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <FileText className="w-4 h-4 shrink-0" />
              <p className="text-gray-800 text-xs truncate">
                {getFileName(uploadedFile)}
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDeleteFile();
              }}
              className="hover:bg-gray-100 ml-2 p-1 rounded-full shrink-0"
            >
              <CircleX size={16} className="text-red-500" />
            </button>
          </div>
        )}
      </div>

      {/* Hidden Input */}
      <input
        id={name}
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Error */}
      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm italic">{meta.error}</p>
      )}
    </div>
  );
};

export default FormInputPdf;
