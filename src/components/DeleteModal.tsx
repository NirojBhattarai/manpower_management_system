import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader, Trash2 } from "lucide-react";
import React from "react";

interface IProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm?: () => void;
  primaryMessage?: string;
  secondaryMessage?: string;
  isLoading?: boolean;
}

const DeleteModal: React.FC<IProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  primaryMessage,
  secondaryMessage,
  isLoading = false,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogContent className="bg-white dark:bg-zinc-900 shadow-2xl p-0 border-0 max-w-md">
        {/* Icon Section */}
        <div className="flex justify-center pt-8">
          <div className="flex justify-center items-center bg-linear-to-br from-red-100 dark:from-red-950 to-red-50 dark:to-red-900 rounded-full w-16 h-16">
            <div className="flex justify-center items-center bg-linear-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30 rounded-full w-12 h-12">
              <Trash2 className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Header Section */}
        <AlertDialogHeader className="px-8 pb-2 text-center">
          <AlertDialogTitle className="font-semibold text-zinc-900 dark:text-zinc-100 text-xl tracking-tight">
            {primaryMessage ?? "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-3 text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
            {secondaryMessage ??
              "This action cannot be undone. This will permanently delete your data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Footer Section */}
        <AlertDialogFooter className="flex sm:flex-row sm:justify-center gap-3 bg-zinc-50/50 dark:bg-zinc-900/50 px-8 py-5 border-zinc-100 dark:border-zinc-800 border-t">
          <AlertDialogCancel
            onClick={onCancel}
            className="flex-1 sm:flex-none bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 shadow-sm hover:shadow px-6 py-2.5 border-zinc-200 dark:border-zinc-700 rounded-xl font-medium text-zinc-700 dark:text-zinc-300 transition-all duration-200"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="flex-1 sm:flex-none bg-linear-to-r from-red-500 hover:from-red-600 to-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 hover:shadow-red-500/30 hover:shadow-xl px-6 py-2.5 rounded-xl font-medium text-white transition-all duration-200"
          >
            {isLoading ? (
              <Loader className="mr-2 w-4 h-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
