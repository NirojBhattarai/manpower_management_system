import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useState } from "react";
import { useDebounce } from "@/utils/useDebounce";
import { InterviewScheduleListResponse } from "../interface/interview-schedule-interface";
import { useSearchParams } from "react-router-dom";

const useInterviewList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);
  const [searchParams] = useSearchParams();

  const resultFilter = searchParams.get("result-filter");
  const interviewModeFilter = searchParams.get("interview-filter");
  const jobFilter = searchParams.get("job-filter");
  const jobOfferStageFilter = searchParams.get("moved-to-job-offer-filter");
  // const fromDate = searchParams.get("from");
  // const toDate = searchParams.get("to");

  const { data, isLoading } = useGetDataQuery<{
    data: InterviewScheduleListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.interviewSchedule.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedSearch,
      interviewResult: resultFilter || "",
      interviewMode: interviewModeFilter || "",
      job: jobFilter || "",
      isMovedToJobOffer: jobOfferStageFilter || "",
    },
    tag: apiTags.interviewSchedule.list,
  });

  return {
    interviewListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useInterviewList;
