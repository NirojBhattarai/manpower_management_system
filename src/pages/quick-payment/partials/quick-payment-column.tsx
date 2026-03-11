import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import TableAction from "@/components/TableAction";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { PATH } from "@/constant/path";
import { useDelete } from "@/hooks/useDelete";
import { IQuickPaymentListItem } from "../interface/quick-payment-interface";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";

// ======================= Qucik Payment Columns ===============================
const QuickPaymentColumns = (): ColumnDef<IQuickPaymentListItem>[] => {
  const navigate = useNavigate();
  const { handleOpenModal: handleOpenDeleteModal } = useDelete({
    endpoints: endpoints.quickPayment.delete,
    invalidates: [apiTags.quickPayment.list],
  });

  const handleClickEdit = useCallback((id: string) => {
    navigate(PATH.quickPayment.update.replace(":id", id));
  }, []);

  return [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <div className="">
            <Checkbox
              checked={
                table.getIsAllRowsSelected()
                  ? true
                  : table.getIsSomeRowsSelected()
                    ? "indeterminate"
                    : false
              }
              onCheckedChange={(value) => {
                table.toggleAllRowsSelected(!!value);
              }}
            />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="">
            <Checkbox
              checked={
                row.getIsSelected()
                  ? true
                  : row.getIsSomeSelected()
                    ? "indeterminate"
                    : false
              }
              onCheckedChange={row.getToggleSelectedHandler()}
            />
          </div>
        );
      },
      size: 50,
    },
    {
      header: "S.N.",
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;

        return pageIndex * pageSize + row.index + 1;
      },
      size: 50,
    },
    {
      header: "Reference",
      accessorKey: "reference",
      size: 150,
    },
    {
      header: "Date",
      accessorKey: "date",
      size: 150,
    },
    {
      header: "Paid From",
      accessorKey: "paidFrom",
      cell: ({ row }) => {
        const value = row?.original?.paidFrom;

        const formattedValue = value
          ? value
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())
          : "N/A";

        return <span>{formattedValue}</span>;
      },
      size: 150,
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => (
        <TableAction
          edit={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleClickEdit(row?.original?.id);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleOpenDeleteModal(row?.original?.id);
            },
          }}
        />
      ),
      size: 150,
      maxSize: 200,
    },
  ];
};

export default QuickPaymentColumns;
