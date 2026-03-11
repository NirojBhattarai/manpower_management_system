import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";
import { PersonalDetailsListResponse } from "../interface/personal-details-interface";

const usePersonalDetailsList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: PersonalDetailsListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.candidates.personalDetails.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.candidates.personalDetails.list,
  });

  return {
    personalDetailsListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};

export default usePersonalDetailsList;
