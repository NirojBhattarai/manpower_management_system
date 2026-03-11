import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import TableAction from "@/components/TableAction";
import { useDelete } from "@/hooks/useDelete";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { IChartOfAccountListItem } from "../interface/chart-of-account-interface";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";

const ChartOfAccountColumn = (): ColumnDef<IChartOfAccountListItem>[] => {
  const { handleOpenModal: handleOpenDeleteModal } = useDelete({
    endpoints: endpoints.chartOfAccount.account.delete,
    invalidates: [apiTags.chartOfAccount.account.list],
  });
  const { handleOpenModal: handleOpenUpdateModal } = useUpdateModal();
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
      header: "Account Name",
      accessorKey: "accountName",
      size: 200,
    },
    {
      header: "Account Code",
      accessorKey: "code",
      size: 200,
    },
    {
      header: "Parent Group",
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
              handleOpenUpdateModal(row?.original?.id);
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

export default ChartOfAccountColumn;
