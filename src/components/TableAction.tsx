import { Eye, Pencil, Trash2 } from "lucide-react";
import React from "react";

interface IAction extends React.DOMAttributes<HTMLButtonElement> {
  active: boolean;
}

interface IActionItem extends React.DOMAttributes<HTMLButtonElement> {
  icon: React.ElementType;
  color?: string;
  toolTip: string;
  disabled?: boolean;
}
interface IProps {
  view?: IAction;
  edit?: IAction;
  del?: IAction;
  actionList?: IActionItem[];
}

const TableAction: React.FC<IProps> = ({
  del = { active: false },
  edit = { active: false },
  view = { active: false },
  actionList,
}) => {
  const { active: deleteActive, ...deleteProps } = del;
  const { active: viewActive, ...viewProps } = view;
  const { active: editActive, ...editProps } = edit;
  return (
    <div className="flex items-center gap-x-3 px-2.5">
      {viewActive && (
        <button title="View" {...viewProps}>
          <Eye
            className="text-secondary-400 hover:scale-125 transition-all duration-300 cursor-pointer shrink-0"
            size={16}
          />
        </button>
      )}

      {editActive && (
        <button title="Edit" {...editProps}>
          <Pencil
            className="text-green-500 hover:text-green-800 hover:scale-125 transition-all duration-300 cursor-pointer shrink-0"
            size={16}
          />
        </button>
      )}

      {deleteActive && (
        <button title="Delete" {...deleteProps}>
          <Trash2
            className="text-error-delete hover:text-red-800 hover:scale-125 transition-all duration-300 cursor-pointer shrink-0"
            size={16}
          />
        </button>
      )}

      {actionList?.length &&
        actionList.map(
          ({ icon: Icon, toolTip, color = "#D0021B", disabled, ...props }) => (
            <button
              key={toolTip}
              title={toolTip}
              {...props}
              disabled={disabled}
            >
              <Icon
                className={`hover:scale-125 transition-all duration-300 cursor-pointer shrink-0 ${disabled && "opacity-50 cursor-not-allowed"}`}
                color={color}
                size={16}
              />
            </button>
          ),
        )}
    </div>
  );
};
export default TableAction;
