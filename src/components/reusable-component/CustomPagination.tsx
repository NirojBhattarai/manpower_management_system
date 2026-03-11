import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  pageCount: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange?: (size: number) => void;
  perPageOptions?: number[];
};

const CustomPagination = ({
  currentPage,
  totalItems,
  pageCount,
  perPage,
  onPageChange,
  onPerPageChange,
  perPageOptions = [5, 10, 20, 50],
}: PaginationProps) => {
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), pageCount || 1);

  const generatePageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    let start = Math.max(1, safeCurrentPage - Math.floor(maxVisible / 2));
    let end = Math.min(pageCount, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const startItem = totalItems === 0 ? 0 : (safeCurrentPage - 1) * perPage + 1;
  const endItem = Math.min(safeCurrentPage * perPage, totalItems);

  return (
    <div className="bg-background-200 w-full">
      <div className="flex md:flex-row flex-col justify-between items-center gap-4 m-2">
        <div className="text-gray-700 text-xs">
          Showing {startItem}-{endItem} of {totalItems}
        </div>

        <div className="flex items-center gap-2">
          {onPerPageChange && (
            <select
              value={perPage}
              onChange={(e) => onPerPageChange(Number(e.target.value))}
              className="px-2 py-1 border rounded-lg text-sm"
            >
              {perPageOptions.map((size) => (
                <option key={size} value={size}>
                  {size} / page
                </option>
              ))}
            </select>
          )}

          <button
            onClick={() => onPageChange(safeCurrentPage - 1)}
            disabled={safeCurrentPage <= 1}
            className="disabled:opacity-50 p-2 rounded-lg disabled:cursor-not-allowed"
          >
            <MdKeyboardArrowLeft className="w-5 h-5" />
          </button>

          {generatePageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-2 rounded-lg text-sm transition ${
                safeCurrentPage === pageNum
                  ? "bg-primary text-white"
                  : "hover:bg-primary/80 text-gray-700 hover:text-white"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => onPageChange(safeCurrentPage + 1)}
            disabled={safeCurrentPage >= pageCount}
            className="disabled:opacity-50 p-2 rounded-lg disabled:cursor-not-allowed"
          >
            <MdKeyboardArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPagination;
