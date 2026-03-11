import TableAction from "@/components/TableAction";
import { ColumnDef } from "@tanstack/react-table";
import { useDelete } from "@/hooks/useDelete";
import { Checkbox } from "@/components/ui/checkbox";
import { IVisaListItem } from "../interface/visa-interface";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import QUERY_PARAMS from "@/constant/query-params";
import {
  getFlagStatusColor,
  getMedicalStatusColor,
} from "@/utils/useStatusColor";
import { FileText } from "lucide-react";

const VisaColumns = (): ColumnDef<IVisaListItem>[] => {
  const deleteVisa = useDelete({
    endpoints: endpoints.visa.list,
    invalidates: [apiTags.visa.list],
  });
  const updateVisa = useQueryParamState(QUERY_PARAMS.visa.updateVisa.key);
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
      header: "Company",
      cell: ({ row }) => row?.original?.company?.companyName,
      size: 200,
    },
    {
      header: "Application Date",
      accessorKey: "applicationDate",
      cell: ({ row }) => row?.original?.applicationDate,
      size: 200,
    },
    {
      header: "Visa Expiry Date",
      accessorKey: "visaExpireDate",
      cell: ({ row }) => row?.original?.visaExpireDate || "N/A",
      size: 200,
    },
    {
      header: "Visa Document",
      accessorKey: "visaFile",
      cell: ({ row }) => {
        const fileUrl = row.original?.visaFile;

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
      header: "Visa Status",
      cell: ({ row }) => {
        const status = row.original.visaStatus;
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getMedicalStatusColor(
              status,
            )}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Moved to Orientation",
      cell: ({ row }) => {
        const status = row.original.isMovedToOrientation
          ? "moved"
          : "not moved";
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
      accessorKey: "action",
      cell: ({ row }) => (
        <TableAction
          edit={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              updateVisa.setValue(row?.original?.id);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              deleteVisa.handleOpenModal(row?.original?.id);
            },
          }}
        />
      ),
      size: 100,
      maxSize: 200,
    },
  ];
};

export default VisaColumns;
