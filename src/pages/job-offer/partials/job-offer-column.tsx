import TableAction from "@/components/TableAction";
import { ColumnDef } from "@tanstack/react-table";
import { useDelete } from "@/hooks/useDelete";
import { Checkbox } from "@/components/ui/checkbox";
import { IJobOfferListItem } from "../interface/job-offer-interface";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import QUERY_PARAMS from "@/constant/query-params";
import {
  getFlagStatusColor,
  getJobOfferStatusColor,
} from "@/utils/useStatusColor";
import { FileText } from "lucide-react";

const JobOfferColumns = (): ColumnDef<IJobOfferListItem>[] => {
  const deleteJobOffer = useDelete({
    endpoints: endpoints.jobOffer.list,
    invalidates: [apiTags.jobOffer.list],
  });
  const updateJobOffer = useQueryParamState(
    QUERY_PARAMS.jobOffer.updateJobOffer.key,
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
      header: "Offered Document",
      accessorKey: "offeredDocument",
      cell: ({ row }) => {
        const fileUrl = row.original?.offeredDocument;

        if (!fileUrl) return <span className="text-muted-foreground">N/A</span>;

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
      header: "Offer Letter No",
      accessorKey: "offerLetterNo",
      cell: ({ row }) => row?.original?.offerLetterNo || "N/A",
      size: 200,
    },
    {
      header: "Offer Date",
      accessorKey: "offerDate",
      size: 200,
    },
    {
      header: "Joining Date",
      accessorKey: "joiningDate",
      size: 200,
    },
    {
      header: "Issued By",
      accessorKey: "issuedBy",
      cell: ({ row }) => row?.original?.issuedBy || "N/A",
      size: 200,
    },
    {
      header: "Job Offer Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getJobOfferStatusColor(
              status,
            )}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Moved to Medical",
      cell: ({ row }) => {
        const status = row.original.isMovedToMedical ? "moved" : "not moved";
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
              updateJobOffer.setValue(row?.original?.id);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              deleteJobOffer.handleOpenModal(row?.original?.id);
            },
          }}
        />
      ),
      size: 100,
      maxSize: 200,
    },
  ];
};

export default JobOfferColumns;
