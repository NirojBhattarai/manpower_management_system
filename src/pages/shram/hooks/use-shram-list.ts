import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useState } from "react";
import { ShramListResponse } from "../interface/shram-interface";
import { useDebounce } from "@/utils/useDebounce";

const useShramList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);

  const { data, isLoading } = useGetDataQuery<{
    data: ShramListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.shram.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.shram.list,
  });

  return {
    shramListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useShramList;
