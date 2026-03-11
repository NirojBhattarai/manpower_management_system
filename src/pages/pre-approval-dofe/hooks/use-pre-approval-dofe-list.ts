import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";
import { PreApprovalDofeListResponse } from "../interface/preapprovaldofe-interface";

const usePreApprovalDofeList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: PreApprovalDofeListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.preApprovalDofe.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.preApprovalDofe.list,
  });

  return {
    preApprovalDofeListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};

export default usePreApprovalDofeList;
