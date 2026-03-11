import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useState } from "react";
import { JobOfferListResponse } from "../interface/job-offer-interface";
import { useDebounce } from "@/utils/useDebounce";
import { useSearchParams } from "react-router-dom";

const useJobOfferList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);
  const [searchParams] = useSearchParams();

  const jobFilter = searchParams.get("job-filter");
  const medicalStageFilter = searchParams.get("moved-to-medical-filter");
  const { data, isLoading } = useGetDataQuery<{
    data: JobOfferListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.jobOffer.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedSearch,
      job: jobFilter || "",
      isMovedToMedical: medicalStageFilter || "",
    },
    tag: apiTags.jobOffer.list,
  });

  return {
    jobOfferListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useJobOfferList;
