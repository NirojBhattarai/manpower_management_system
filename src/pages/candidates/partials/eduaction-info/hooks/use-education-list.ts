import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";
import { EducationListResponse } from "../interface/education-info-interface";
import { useParams } from "react-router-dom";

const useEducationList = () => {
  const { id: paramJobSeekerId } = useParams();
  const localJobSeekerId = localStorage.getItem("jobSeekerId");

  const jobSeekerId = paramJobSeekerId || localJobSeekerId;

  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);

  const { data, isLoading } = useGetDataQuery<{
    data: EducationListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.candidates.education.list.replace(":id", jobSeekerId ?? ""),
    params: {
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.candidates.education.list,
  });

  return {
    educationListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useEducationList;
