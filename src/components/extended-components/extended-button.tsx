import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ButtonProps {
  text?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
  type?: "button" | "submit";
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  loadingText?: string;
}
const ExtendedButton = ({
  text = "",
  variant = "default",
  className,
  type,
  isLoading,
  onClick,
  disabled,
  loadingText,
}: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "bg-green-600 p-[1.25rem] rounded-full shadow-[0px_4px_4px_0px_#E4E8EC] typography-paragraph-small font-medium text-white hover:bg-green-700 cursor-pointer",
        {
          "opacity-80": isLoading,
        },
        className
      )}
      type={type || "button"}
      variant={variant}
      disabled={isLoading || disabled}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <span className="flex space-x-1 ">
          <Loader2 className="animate-spin mr-1" /> {loadingText}
        </span>
      ) : (
        text
      )}
    </Button>
  );
};

export default ExtendedButton;
