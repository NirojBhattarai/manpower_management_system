import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { IPaginationResponse } from "@/interface/apiResponse.interface";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";

export interface IOrientationInstituteListItem {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}
type OrientationInstituteListResponse =
  IPaginationResponse<IOrientationInstituteListItem>;

const useOrientationInstituteList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: OrientationInstituteListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.orientationInstitute.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.orientationInstitute.list,
  });

  return {
    orientationInstituteListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useOrientationInstituteList;
