import { ColumnDef } from "@tanstack/react-table";
import { useDelete } from "@/hooks/useDelete";
import TableAction from "@/components/TableAction";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import QUERY_PARAMS from "@/constant/query-params";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IAppliedJobListItem } from "./interface/applied-job-interface";
import { Calendar } from "lucide-react";
import {
  getApprovalStatusColor,
  getInterviewStatusColor,
} from "@/utils/useStatusColor";

const AppliedJobColumns = (): ColumnDef<IAppliedJobListItem>[] => {
  const updateAppliedJob = useQueryParamState(
    QUERY_PARAMS.appliedJob.updateAppliedJob.key,
  );

  const deleteAppliedJob = useDelete({
    endpoints: endpoints.candidates.appliedJob.delete,
    invalidates: [apiTags.candidates.appliedJob.list],
  });

  const interviewSchedule = useQueryParamState(
    QUERY_PARAMS.interviewSchedule.createInterviewSchedule.key,
  );

  return [
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
      header: "Applied Country",
      cell: ({ row }) => row.original.country?.country,
      size: 150,
    },
    {
      header: "Applied Company",
      cell: ({ row }) => row.original.company?.companyName,
      size: 150,
    },
    {
      header: "Job Vacancy",
      cell: ({ row }) => row.original.jobvacancy?.jobTitle?.jobtitle,
      size: 150,
    },
    {
      header: "Approval Status",
      cell: ({ row }) => {
        const status = row.original.approvalStatus?.status ?? "Rejected";

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getApprovalStatusColor(
              status,
            )}`}
          >
            {status}
          </span>
        );
      },
      size: 100,
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
    },
    {
      header: "Recruitment Stage",
      cell: ({ row }) => {
        return (
          <span className="bg-slate-800 px-3 py-1 rounded-2xl text-white text-xs capitalize">
            {row.original.recruitmentStage}
          </span>
        );
      },
      size: 150,
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => {
        return (
          <TableAction
            edit={{
              active: true,
              onClick: (e) => {
                e.preventDefault();
                updateAppliedJob.setValue(row?.original?.id);
              },
            }}
            del={{
              active: true,
              onClick: (e) => {
                e.preventDefault();
                deleteAppliedJob.handleOpenModal(row?.original?.id);
              },
            }}
            actionList={[
              {
                icon: Calendar,
                toolTip: "Schedule Interview",
                color: "#2563eb",
                onClick: (e) => {
                  e.preventDefault();
                  interviewSchedule.setValue(row?.original?.id);
                },
                disabled: row?.original?.interviewStatus !== null,
              },
            ]}
          />
        );
      },
      size: 120,
    },
  ];
};

export default AppliedJobColumns;
