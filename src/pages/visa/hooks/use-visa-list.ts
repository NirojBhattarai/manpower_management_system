import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useState } from "react";
import { VisaListResponse } from "../interface/visa-interface";
import { useDebounce } from "@/utils/useDebounce";

const useVisaList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: VisaListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.visa.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.visa.list,
  });

  return {
    visaListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useVisaList;
