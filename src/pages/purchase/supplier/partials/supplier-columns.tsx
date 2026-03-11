import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import TableAction from "@/components/TableAction";
import { useUpdateModal } from "@/hooks/use-update-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ISupplierListItem } from "../interface/supplier-interface";

export default function SupplierColumns(): ColumnDef<ISupplierListItem>[] {
  const updateModal = useUpdateModal(QUERY_PARAMS.supplier.updateSupplier.key);
  const deleteModal = useDelete({
    endpoints: endpoints.supplier.delete,
    invalidates: [apiTags.supplier.list],
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
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;

        return pageIndex * pageSize + row.index + 1;
      },
      size: 50,
    },
    {
      header: "Supplier Name",
      accessorKey: "name",
      size: 200,
    },
    {
      header: "Address",
      accessorKey: "address",
      size: 200,
    },
    {
      header: "Phone Number",
      accessorKey: "phone",
      size: 200,
    },
    {
      header: "Code",
      accessorKey: "code",
      size: 200,
    },
    {
      header: "Account Group",
      accessorKey: "group",
      cell: ({ row }) => {
        return <span>{row?.original?.group?.groupName || "N/A"}</span>;
      },
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
              updateModal.handleOpenModal(row?.original?.id);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              deleteModal.handleOpenModal(row?.original?.id);
            },
          }}
        />
      ),
      size: 200,
      maxSize: 200,
    },
  ];
}
