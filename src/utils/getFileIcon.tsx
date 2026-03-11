import { BiSolidFilePdf } from "react-icons/bi";
import { FileText } from "lucide-react";

export const getFileIcon = (doc?: string | File) => {
  // URL string from backend
  if (typeof doc === "string") {
    if (doc.toLowerCase().endsWith(".pdf")) {
      return <BiSolidFilePdf size={28} className="text-red-600" />;
    }
  }

  // File object (future-proof)
  if (doc instanceof File) {
    if (doc.type === "application/pdf") {
      return <BiSolidFilePdf size={28} className="text-red-600" />;
    }
  }

  return <FileText size={28} className="text-gray-500" />;
};
