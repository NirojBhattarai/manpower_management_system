import React from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import LoadingScreen from "../reusable-component/LoadingScreen";

interface IProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  childrenWrapperClassName?: string;
  isLoading?: boolean;
  showCloseButton?: boolean;
}

const ModalWrapper: React.FC<IProps> = ({
  isOpen,
  onOpenChange,
  name,
  description,
  isLoading = false,
  className,
  childrenWrapperClassName,
  showCloseButton = true,
  children,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={showCloseButton}
        className={cn(
          "sm:max-w-2xl lg:max-w-6xl xl:max-w-7xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
          className
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-secondary-600 font-bold">
            {name}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-gray-500">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className={cn("relative min-h-25", childrenWrapperClassName)}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <LoadingScreen />
            </div>
          ) : (
            children
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWrapper;
