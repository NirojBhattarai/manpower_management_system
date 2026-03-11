import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { IPaginationResponse } from "@/interface/apiResponse.interface";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";

export interface IRoleListItem {
  id: string;
  label: string;
}
export type RoleListResponse = IPaginationResponse<IRoleListItem>;

const useRoleList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: RoleListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.role.list,
    params: {
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.role.list,
  });

  return {
    roleListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useRoleList;
