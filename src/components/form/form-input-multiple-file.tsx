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

type PdfValue = (File | string)[];

const FormInputMultiplePdf: React.FC<IPdfUpload> = ({
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

  const [uploadedFiles, setUploadedFiles] = useState<PdfValue>([]);

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
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const updatedFiles = [...uploadedFiles, ...files];
    setUploadedFiles(updatedFiles);
    setFieldValue(name, updatedFiles);
  };

  const handleDeleteFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
    setFieldValue(name, updatedFiles);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetAll = () => {
    setUploadedFiles([]);
    setFieldValue(name, []);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ---------------- Sync Formik value ---------------- */

  useEffect(() => {
    if (field.value?.length) setUploadedFiles(field.value);
    else setUploadedFiles([]);
  }, [field.value]);

  /* ---------------- Expose reset ---------------- */

  useImperativeHandle(handleDeleteRef, () => ({
    reset: resetAll,
  }));

  /* ---------------- Render ---------------- */

  return (
    <div className={cn("flex flex-col gap-2", wrapperClassName)}>
      {/* Label */}
      <label className={cn("typography-input-label", labelClassName)}>
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>

      {/* Upload Box */}
      <div
        className={cn(
          "relative flex flex-col gap-2 w-full cursor-pointer",
          "border rounded-[10px] px-3 py-2 bg-white",
          className,
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        {!uploadedFiles.length && (
          <p className="text-[12px] text-gray-400">
            Click to upload PDFs (multiple allowed)
          </p>
        )}

        {uploadedFiles.map((file, index) => (
          <div
            key={index}
            className="flex justify-between items-center w-full"
            onClick={(e) => {
              e.stopPropagation();
              openPdf(file);
            }}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <FileText className="w-4 h-4 shrink-0" />
              <p className="text-gray-800 text-xs truncate">
                {getFileName(file)}
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDeleteFile(index);
              }}
              className="hover:bg-gray-100 ml-2 p-1 rounded-full shrink-0"
            >
              <CircleX size={16} className="text-red-500" />
            </button>
          </div>
        ))}
      </div>

      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Error */}
      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm italic">{meta.error as string}</p>
      )}
    </div>
  );
};

export default FormInputMultiplePdf;
