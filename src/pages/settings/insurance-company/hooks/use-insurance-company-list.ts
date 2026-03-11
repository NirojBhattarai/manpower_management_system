import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { IPaginationResponse } from "@/interface/apiResponse.interface";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";

export interface IInsuranceCompanyListItem {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}
type InsuranceCompanyListResponse =
  IPaginationResponse<IInsuranceCompanyListItem>;

const useInsuranceCompanyList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: InsuranceCompanyListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.insuranceCompany.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.insuranceCompany.list,
  });

  return {
    insuranceCompanyListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useInsuranceCompanyList;
