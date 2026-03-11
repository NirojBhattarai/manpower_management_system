import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";
import { SkillsListResponse } from "../interface/skills-interface";

const useSkillsList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: SkillsListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.candidates.skillandLanguages.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.candidates.skillandLanguages.list,
  });

  return {
    personalDetailsListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};

export default useSkillsList;
