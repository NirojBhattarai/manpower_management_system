import TableAction from "@/components/TableAction";
import { ColumnDef } from "@tanstack/react-table";
import { useDelete } from "@/hooks/useDelete";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { Checkbox } from "@/components/ui/checkbox";
import { IShramListItem } from "../interface/shram-interface";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { FileText } from "lucide-react";
import {
  getFlagStatusColor,
  getShramStatusColor,
} from "@/utils/useStatusColor";

const ShramColumns = (): ColumnDef<IShramListItem>[] => {
  const deleteShram = useDelete({
    endpoints: endpoints.shram.delete,
    invalidates: [apiTags.shram.list],
  });
  const updateShram = useUpdateModal();
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
      cell: ({ row }) => row?.original?.jobseeker?.fullName,
      size: 200,
    },
    {
      header: "Candidate Job",
      cell: ({ row }) => row?.original?.jobTitle?.jobtitle,
      size: 200,
    },
    {
      header: "Employer Name",
      cell: ({ row }) => row?.original?.company?.companyName,
      size: 200,
    },
    {
      header: "OLS Reference Number",
      accessorKey: "olsReferenceNo",
      cell: ({ row }) => row?.original?.olsReferenceNo || "N/A",
      size: 200,
    },
    {
      header: "Approval Date",
      accessorKey: "approvalDate",
      cell: ({ row }) => row?.original?.approvalDate || "N/A",
      size: 200,
    },
    {
      header: "Labour Permit",
      accessorKey: "approvalFile",
      cell: ({ row }) => {
        const fileUrl = row.original?.approvalFile;

        if (!fileUrl) return <span>N/A</span>;

        return (
          <button
            type="button"
            onClick={() => window.open(fileUrl, "_blank")}
            className="flex items-center gap-2 text-primary hover:text-blue-800 hover:underline hover:cursor-pointer"
          >
            <FileText className="w-4 h-4" />
          </button>
        );
      },
      size: 200,
    },
    {
      header: "Labour Permit Status",
      cell: ({ row }) => {
        const status = row.original.shramStatus;
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getShramStatusColor(
              status,
            )}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Moved to Ticket",
      cell: ({ row }) => {
        const status = row.original.isMovedToTicket ? "moved" : "not moved";
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getFlagStatusColor(
              status,
            )}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <TableAction
          edit={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              updateShram.handleOpenModal(row.original.id);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              deleteShram.handleOpenModal(row.original.id);
            },
          }}
        />
      ),
      size: 200,
      maxSize: 200,
    },
  ];
};

export default ShramColumns;
