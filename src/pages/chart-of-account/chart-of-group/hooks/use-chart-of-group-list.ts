import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useState } from "react";
import { ChartOfGroupListResponse } from "../interface/chart-of-group-interface";
import { useDebounce } from "@/utils/useDebounce";

const useChartOfGroupList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedsearch = useDebounce<string>(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: ChartOfGroupListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.chartOfAccount.group.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedsearch,
    },
    tag: apiTags.chartOfAccount.group.list,
  });

  return {
    chartOfGroupListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useChartOfGroupList;
