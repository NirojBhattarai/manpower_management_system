import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import TableAction from "@/components/TableAction";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import QUERY_PARAMS from "@/constant/query-params";
import { IChequeReceivedListItem } from "../interface/cheque-received-interface";
import { getChequeStatusColor } from "@/utils/useStatusColor";

const ChequeReceivedColumn = (): ColumnDef<IChequeReceivedListItem>[] => {
  const { handleOpenModal: handleOpenDeleteModal } = useDelete({
    endpoints: endpoints?.chequeReceived.delete,
    invalidates: [apiTags.chequeRegister.chequeReceived.list],
  });
  const updateModal = useQueryParamState(
    QUERY_PARAMS.chequeRegister.chequeReceived.updateChequeReceived.key,
  );
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
      header: "Customer Account",
      accessorKey: "customerAccount",
      cell: ({ row }) => {
        return (
          <span>{row?.original?.customerAccount?.accountName || "N/A"}</span>
        );
      },
      size: 200,
    },
    {
      header: "Cheque Date",
      accessorKey: "chequeDate",
      cell: ({ row }) => {
        return <span>{row?.original?.chequeDate || "N/A"}</span>;
      },
      size: 200,
    },
    {
      header: "Received Date",
      accessorKey: "receivedDate",
      cell: ({ row }) => {
        return <span>{row?.original?.receivedDate || "N/A"}</span>;
      },
      size: 200,
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => {
        return <span>{row?.original?.amount || "N/A"}</span>;
      },
      size: 150,
    },
    {
      header: "Cheque No.",
      accessorKey: "chequeNumber",
      cell: ({ row }) => {
        return <span>{row?.original?.chequeNumber || "N/A"}</span>;
      },
      size: 200,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getChequeStatusColor(
              status,
            )}`}
          >
            {status}
          </span>
        );
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
              updateModal.setValue(row?.original?.id);
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

export default ChequeReceivedColumn;
