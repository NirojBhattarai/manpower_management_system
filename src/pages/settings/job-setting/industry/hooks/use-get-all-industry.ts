import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { IPaginationResponse } from "@/interface/apiResponse.interface";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";

export interface IndustryListItem {
  id: string;
  industry: string;
}
export type IndustryListResponse = IPaginationResponse<IndustryListItem>;
const useGetAllIndustry = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: IndustryListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.jobsetting.industry.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.industry.list,
  });

  return {
    industryListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};

export default useGetAllIndustry;
