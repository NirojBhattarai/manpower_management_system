import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";
import { JobVacancyListResponse } from "../interface/job-vacancy-interface";

const useJobVacancyList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: JobVacancyListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.jobVacancy.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.jobVacancy.list,
  });

  return {
    jobVacancyListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useJobVacancyList;
