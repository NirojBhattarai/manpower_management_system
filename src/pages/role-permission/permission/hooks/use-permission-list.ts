import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { IPaginationResponse } from "@/interface/apiResponse.interface";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";

export interface IPermissionListItem {
  id: string;
  role: {
    id: string;
    label: string;
  };
  adminAccess: boolean;
  permissionScopes: string[];
}
type PermissionListResponse = IPaginationResponse<IPermissionListItem>;

const usePermissionList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: PermissionListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.permission.list,
    params: {
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.permission.list,
  });

  return {
    permissionListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default usePermissionList;
