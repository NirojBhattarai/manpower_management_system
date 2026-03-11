import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { AppliedJobListResponse } from "../interface/applied-job-interface";

const useAppliedJobList = () => {
  const { id: paramJobSeekerId } = useParams();
  const localJobSeekerId = localStorage.getItem("jobSeekerId");

  const jobSeekerId = paramJobSeekerId || localJobSeekerId;

  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);
  const [searchParams] = useSearchParams();

  const jobApprovalStatusFilter = searchParams.get(
    "job-approval-status-filter",
  );
  const interviewStatusFilter = searchParams.get("interview-status-filter");
  const { data, isLoading } = useGetDataQuery<{
    data: AppliedJobListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.candidates.appliedJob.list.replace(":id", jobSeekerId ?? ""),
    params: {
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
      search: debouncedSearch,
      approvalStatus: jobApprovalStatusFilter || "",
      interviewStatus: interviewStatusFilter || "",
    },
    tag: apiTags.candidates.appliedJob.list,
  });

  return {
    appliedJobListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useAppliedJobList;
