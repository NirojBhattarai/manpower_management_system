import { ColumnDef } from "@tanstack/react-table";
import { useDelete } from "@/hooks/useDelete";
import { Checkbox } from "@/components/ui/checkbox";
import TableAction from "@/components/TableAction";
import { IInvoiceListItem } from "../interface/invoice-interfaces";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constant/path";

const InvoiceColumns = (): ColumnDef<IInvoiceListItem>[] => {
  const navigate = useNavigate();

  const { handleOpenModal: handleOpenDeleteModal } = useDelete({
    endpoints: endpoints.invoice.delete,
    invalidates: [apiTags.invoice.list],
  });
  const handleUpdateClick = (id: string) => {
    navigate(PATH.invoice.update.replace(":id", id));
  };

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
      header: "Candidate Name",
      cell: ({ row }) => row?.original?.jobseeker?.fullName || "",
      size: 200,
    },
    {
      header: "Reference No",
      accessorKey: "refNo",
      size: 200,
    },
    {
      header: "Invoice Date",
      accessorKey: "invoiceDate",
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
              handleUpdateClick(row?.original?.id);
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

export default InvoiceColumns;
