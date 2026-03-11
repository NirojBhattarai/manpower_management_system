import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { IPaginationResponse } from "@/interface/apiResponse.interface";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";

export interface ICategoryListItem {
  id: string;
  industry: {
    id: string;
    industry: string;
  };
  category: string;
  icon: string;
}
type CategoryListResponse = IPaginationResponse<ICategoryListItem>;
const useCategoryList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: CategoryListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.jobsetting.category.list,
    params: {
      page: pagination.pageIndex,
      page_size: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.category.list,
  });

  return {
    categoryListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};

export default useCategoryList;
