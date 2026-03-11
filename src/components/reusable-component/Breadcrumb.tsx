import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex gap-2 text-primary-500" aria-label="Breadcrumb">
      <ol className="inline-flex items-center gap-x-2">
        {items?.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center gap-x-2">
              {!isLast && item.to ? (
                <Link
                  to={item.to}
                  className="inline-flex items-center text-sm font-medium text-text-main hover:text-primary-600"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-sm font-medium text-gray-500">
                  {item.label}
                </span>
              )}

              {!isLast && <ChevronRightIcon size={14} strokeWidth={3} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
