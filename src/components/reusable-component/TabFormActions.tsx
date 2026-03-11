import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabAction {
  label: string;
  variant: "submit" | "cancel" | "previous";
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

interface TabFormActionsProps {
  actions: TabAction[];
}

export const TabFormActions = ({ actions }: TabFormActionsProps) => {
  const leftActions = actions.filter((a) => a.variant === "previous");
  const rightActions = actions.filter((a) => a.variant !== "previous");

  return (
    <div className="flex justify-between mt-6 px-2 py-4">
      <div className="flex gap-2">
        {leftActions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={action.onClick}
            disabled={action.disabled || action.loading}
            className={cn(
              "flex items-center gap-2 hover:bg-secondary-50 px-4 py-2 border border-secondary-500 rounded-lg font-medium text-secondary-600 text-sm transition-all duration-200",
              action.disabled || action.loading
                ? "opacity-50 cursor-not-allowed shadow-none"
                : "shadow-sm",
            )}
          >
            {action.loading && <Loader size={14} className="animate-spin" />}
            {action.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        {rightActions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={action.onClick}
            disabled={action.disabled || action.loading}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200",
              action.variant === "submit"
                ? "bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700"
                : action.variant === "cancel"
                  ? "bg-red-500 text-white hover:bg-red-600 active:bg-red-700"
                  : "border border-secondary-500 text-secondary-600 hover:bg-secondary-50",
              action.disabled || action.loading
                ? "opacity-50 cursor-not-allowed shadow-none"
                : "shadow-sm",
            )}
          >
            {action.loading && <Loader size={14} className="animate-spin" />}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};
