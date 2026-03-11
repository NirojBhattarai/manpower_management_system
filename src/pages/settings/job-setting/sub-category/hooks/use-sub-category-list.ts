import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { IPaginationResponse } from "@/interface/apiResponse.interface";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";

export interface ISubCategoryListItem {
  id: string;
  industry: {
    id: string;
    industry: string;
  };
  category: {
    id: string;
    category: string;
  };
  subcategory: string;
  icon: string;
}
type SubCategoryListResponse = IPaginationResponse<ISubCategoryListItem>;
const useSubCategoryList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: SubCategoryListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.jobsetting.subCategory.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.subCategory.list,
  });

  return {
    subCategoryListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};

export default useSubCategoryList;
