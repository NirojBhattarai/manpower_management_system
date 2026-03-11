import { ColumnDef } from "@tanstack/react-table";
import { useDelete } from "@/hooks/useDelete";
import { Checkbox } from "@/components/ui/checkbox";
import TableAction from "@/components/TableAction";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import QUERY_PARAMS from "@/constant/query-params";
import { IInterviewScheduleListItem } from "../interface/interview-schedule-interface";
import {
  getFlagStatusColor,
  getInterviewResultColor,
  getInterviewStatusColor,
} from "@/utils/useStatusColor";

const InterviewColumns = (): ColumnDef<IInterviewScheduleListItem>[] => {
  const updateInterview = useQueryParamState(
    QUERY_PARAMS.interview.updateInterview.key,
  );
  const deleteInterview = useDelete({
    endpoints: endpoints.interviewSchedule.list,
    invalidates: [apiTags.interviewSchedule.list],
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
      header: "Interview Date",
      cell: ({ row }) => row?.original?.interviewDate || "N/A",
      size: 200,
    },
    {
      header: "Interview Mode",
      cell: ({ row }) => {
        return (
          <span className="capitalize">
            {row?.original?.interviewMode || "N/A"}
          </span>
        );
      },
      size: 150,
    },
    {
      header: "Interviewer Name",
      cell: ({ row }) => row?.original?.interviewerName || "N/A",
      size: 200,
    },
    {
      header: "Interview Location",
      cell: ({ row }) => {
        return (
          <span className="capitalize">
            {row?.original?.interviewLocation || "N/A"}
          </span>
        );
      },
      size: 200,
    },
    {
      header: "Interview Status",
      cell: ({ row }) => {
        const status = row.original.interviewStatus ?? "not scheduled";

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getInterviewStatusColor(
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
      header: "Result",
      cell: ({ row }) => {
        const status = row.original.interviewResult;
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getInterviewResultColor(
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
      header: "Scheduled By",
      cell: ({ row }) => {
        return (
          <span className="capitalize">
            {row?.original?.scheduledBy?.name || "N/A"}
          </span>
        );
      },
      size: 200,
    },
    {
      header: "Moved to Job Offer",
      cell: ({ row }) => {
        const status = row.original.isMovedToJobOffer ? "moved" : "not moved";
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
      cell: ({ row }) => row?.original?.remarks || "N/A",
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
              updateInterview.setValue(row?.original?.id);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              deleteInterview.handleOpenModal(row?.original?.id);
            },
          }}
        />
      ),
      size: 100,
      maxSize: 200,
    },
  ];
};

export default InterviewColumns;
