import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";
import { ChartOfAccountListResponse } from "../interface/chart-of-account-interface";

const useChartOfAccountList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedsearch = useDebounce<string>(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: ChartOfAccountListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.chartOfAccount.account.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedsearch,
    },
    tag: apiTags.chartOfAccount.account.list,
  });

  return {
    chartOfAccountListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useChartOfAccountList;
