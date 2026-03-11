import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  HeaderGroup,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useCallback, useMemo } from "react";
import CustomPagination from "./reusable-component/CustomPagination";
import { cn } from "@/lib/utils";
import { typedMemo } from "@/utils/memo";
import { usePagination } from "@/hooks/usePagination";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  getRowId?: (row: T, index: number) => string;
  rowSelection?: RowSelectionState;
  setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>;
  onSelectedRowsChange?: (rows: T[]) => void;
  // Table Meta Data
  mainClassName?: string;
  tHeadCellClassName?: string;
  totalItems?: number;
  totalPages?: number;
  isPagination?: boolean;
}

const Table = <T,>({
  data,
  columns,
  getRowId,
  rowSelection,
  setRowSelection,
  totalItems = 0,
  totalPages = 0,
  onSelectedRowsChange,
  mainClassName,
  tHeadCellClassName,
  isPagination = true,
}: TableProps<T>) => {
  const pagination = usePagination();
  // Memoize table configuration to prevent unnecessary recalculations
  const tableConfig = useMemo(
    () => ({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
      pageCount: totalPages,
      state: {
        rowSelection,
        pagination: pagination.pagination,
      },
      enableRowSelection: true,
      enableMultiRowSelection: true,
      enableColumnResizing: false,
      onRowSelectionChange: setRowSelection,
      onPaginationChange: pagination.handlePaginationChange,
      getPaginationRowModel: getPaginationRowModel(),

      getRowId,
    }),
    [
      data,
      columns,
      totalPages,
      rowSelection,
      pagination.pagination,
      setRowSelection,
      pagination.handlePaginationChange,
    ],
  );

  const table = useReactTable(tableConfig);

  const handleSelectedRowsChange = useCallback(() => {
    if (onSelectedRowsChange) {
      const selectedData = table
        .getSelectedRowModel()
        .rows.map((row) => row.original);
      onSelectedRowsChange(selectedData);
    }
  }, [onSelectedRowsChange, table]);

  React.useEffect(() => {
    handleSelectedRowsChange();
  }, [rowSelection, handleSelectedRowsChange]);

  const handlePageChange = useCallback(
    (page: number) => {
      pagination.handlePaginationChange({
        pageIndex: page - 1,
        pageSize: pagination.pagination.pageSize,
      });
    },
    [pagination],
  );

  const handlePerPageChange = useCallback(
    (size: number) => {
      pagination.handlePaginationChange({
        pageIndex: 0,
        pageSize: size,
      });
    },
    [pagination],
  );

  const renderHeader = useCallback(
    (headerGroup: HeaderGroup<T>) => (
      <tr key={headerGroup.id} className="w-full h-fit">
        {headerGroup.headers.map((header) => (
          <th
            key={header.id}
            style={{
              width: header.column.getSize(),
              minWidth: header.column.columnDef.minSize,
              maxWidth: header.column.columnDef.maxSize,
            }}
            className={cn(
              "py-3 text-text-500 typo-mid-bd-reg",
              tHeadCellClassName,
            )}
          >
            <div className="flex justify-center items-center h-full">
              <span className="w-full text-center">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </span>
            </div>
          </th>
        ))}
      </tr>
    ),
    [tHeadCellClassName],
  );

  const renderRow = useCallback(
    (row: any, index: number) => (
      <tr
        key={row.id}
        className={`w-full hover:bg-secondary-50/50 ${
          index % 2 === 0 ? "" : "bg-secondary-50/20"
        }`}
      >
        {row.getVisibleCells().map((cell: any) => (
          <td
            key={cell.id}
            style={{
              width: cell.column.getSize(),
              minWidth: cell.column.columnDef.minSize,
              maxWidth: cell.column.columnDef.maxSize,
            }}
            className="px-5 py-2.5 text-text-400 typo-mid-bd-light"
          >
            <div className="flex justify-center items-center h-full text-center">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          </td>
        ))}
      </tr>
    ),
    [],
  );

  return (
    <div
      className={cn(
        `flex flex-col justify-between border-x border-b rounded-b-xl w-full h-full overflow-hidden`,
        mainClassName,
      )}
    >
      {/* Table Content */}
      <div className="flex flex-col overflow-x-auto overflow-y-auto">
        <table className="w-full table-fixed">
          <thead className="border-b">
            {table.getHeaderGroups().map(renderHeader)}
          </thead>
          <tbody className="min-w-full">
            {table
              .getRowModel()
              .rows.map((row, index) => renderRow(row, index))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {isPagination && (
        <CustomPagination
          currentPage={pagination.pagination.pageIndex + 1}
          totalItems={totalItems}
          pageCount={totalPages}
          perPage={pagination.pagination.pageSize}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        />
      )}
    </div>
  );
};

export default typedMemo(Table);
