import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import TableAction from "@/components/TableAction";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import QUERY_PARAMS from "@/constant/query-params";
import { IChequeIssuedListItem } from "../interface/issued-cheque-interface";
import { getChequeStatusColor } from "@/utils/useStatusColor";

const ChequeIssuedColumn = (): ColumnDef<IChequeIssuedListItem>[] => {
  const { handleOpenModal: handleOpenDeleteModal } = useDelete({
    endpoints: endpoints?.chequeIssued.delete,
    invalidates: [apiTags.chequeRegister.chequeIssued.list],
  });
  const updateModal = useQueryParamState(
    QUERY_PARAMS.chequeRegister.chequeIssued.updateChequeIssued.key,
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
      header: "Supplier Account",
      accessorKey: "supplierAccount",
      cell: ({ row }) => {
        return <span>{row?.original?.supplierAccount?.name || "N/A"}</span>;
      },
      size: 200,
    },
    {
      header: "Payee Name",
      accessorKey: "payeeName",
      cell: ({ row }) => {
        return <span>{row?.original?.payeeName || "N/A"}</span>;
      },
      size: 200,
    },
    {
      header: "Bank Account",
      accessorKey: "bankAccount",
      cell: ({ row }) => {
        return <span>{row?.original?.bankAccount?.bankName || "N/A"}</span>;
      },
      size: 250,
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
      header: "Issued Date",
      accessorKey: "issuedDate",
      cell: ({ row }) => {
        return <span>{row?.original?.issuedDate || "N/A"}</span>;
      },
      size: 200,
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => {
        return <span>{row?.original?.amount || "N/A"}</span>;
      },
      size: 200,
    },
    {
      header: "Cheque Number",
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

export default ChequeIssuedColumn;
