import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { IPaginationResponse } from "@/interface/apiResponse.interface";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";

export interface IJobTitleListItem {
  id: string;
  industry: {
    id: string;
    industry: string;
  };
  category: {
    id: string;
    category: string;
  };
  subcategory: {
    id: string;
    subcategory: string;
  };
  jobtitle: string;
  icon: string;
}
type JobTitleListResponse = IPaginationResponse<IJobTitleListItem>;

const useJobTitleList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: JobTitleListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.jobsetting.jobTitle.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.jobTitle.list,
  });

  return {
    jobTitleListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};

export default useJobTitleList;
