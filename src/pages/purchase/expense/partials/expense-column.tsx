import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import TableAction from "@/components/TableAction";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { PATH } from "@/constant/path";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IExpenseListItem } from "../interface/interface-expense";

const ExpenseColumn = (): ColumnDef<IExpenseListItem>[] => {
  const navigate = useNavigate();
  const handleClickEdit = useCallback((id: string) => {
    navigate(PATH.accounting.purchase.expense.update.replace(":id", id));
  }, []);
  const { handleOpenModal: handleOpenDeleteModal } = useDelete({
    endpoints: endpoints.expense.delete,
    invalidates: [apiTags.expense.list],
  });

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
      cell: ({ row }) => row.index + 1,
      size: 100,
    },
    {
      header: "Supplier",
      accessorKey: "supplier",
      cell: ({ row }) => row?.original?.supplier?.name,
      size: 200,
    },
    {
      header: "Invoice Reference No.",
      accessorKey: "invoiceReferenceNo",
      size: 200,
    },
    {
      header: "Invoice Date",
      accessorKey: "date",
      size: 200,
    },
    {
      header: "Due Date",
      accessorKey: "dueDate",
      size: 200,
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
      size: 200,
      maxSize: 200,
    },
  ];
};

export default ExpenseColumn;
