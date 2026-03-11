import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useState } from "react";
import { InsuranceListResponse } from "../interface/insurance-interface";
import { useDebounce } from "@/utils/useDebounce";

const useInsuranceList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);

  const { data, isLoading } = useGetDataQuery<{
    data: InsuranceListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.insurance.list,
    params: {
      page: pagination.pageIndex,
      page_size: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.insurance.list,
  });

  return {
    insuranceListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useInsuranceList;
