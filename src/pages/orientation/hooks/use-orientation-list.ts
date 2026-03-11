import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useState } from "react";
import { useDebounce } from "@/utils/useDebounce";
import { OrientationListResponse } from "../interface/orientation-interface";

const useOrientationList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);

  const { data, isLoading } = useGetDataQuery<{
    data: OrientationListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.orientation.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.orientation.list,
  });

  return {
    orientationListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useOrientationList;
