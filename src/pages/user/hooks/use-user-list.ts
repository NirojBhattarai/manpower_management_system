import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { IPaginationResponse } from "@/interface/apiResponse.interface";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";

export interface IUserListItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: {
    id: string;
    label: string;
  };
}
export type UserListResponse = IPaginationResponse<IUserListItem>;

const useUserList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: UserListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.user.list,
    params: {
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.user.list,
  });

  return {
    userListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useUserList;
