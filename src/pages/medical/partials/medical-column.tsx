import TableAction from "@/components/TableAction";
import { ColumnDef } from "@tanstack/react-table";
import { useDelete } from "@/hooks/useDelete";
import { Checkbox } from "@/components/ui/checkbox";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import QUERY_PARAMS from "@/constant/query-params";
import { IMedicalListItem } from "../interface/medical-interface";
import { FileText } from "lucide-react";
import {
  getFlagStatusColor,
  getMedicalStatusColor,
} from "@/utils/useStatusColor";

const MedicalColumns = (): ColumnDef<IMedicalListItem>[] => {
  const deleteMedical = useDelete({
    endpoints: endpoints.medical.list,
    invalidates: [apiTags.medical.list],
  });
  const updateMedical = useQueryParamState(
    QUERY_PARAMS.medical.updateMedical.key,
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
      header: "Medical Institute",
      cell: ({ row }) => row?.original?.hospital?.name,
      size: 200,
    },
    {
      header: "Medical Date",
      accessorKey: "examDate",
      size: 200,
    },
    {
      header: "Medical Report",
      accessorKey: "offeredDocument",
      cell: ({ row }) => {
        const fileUrl = row.original?.reportFile;

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
      header: "Medical Status",
      cell: ({ row }) => {
        const status = row.original.medicalStatus;
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
      header: "Moved to Visa",
      cell: ({ row }) => {
        const status = row.original.isMovedToVisa ? "moved" : "not moved";
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
      header: "Remarks",
      accessorKey: "remarks",
      cell: ({ row }) => row?.original?.remarks || "N/A",
      size: 250,
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
              updateMedical.setValue(row?.original?.id);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              deleteMedical.handleOpenModal(row?.original?.id);
            },
          }}
        />
      ),
      size: 100,
      maxSize: 200,
    },
  ];
};

export default MedicalColumns;
