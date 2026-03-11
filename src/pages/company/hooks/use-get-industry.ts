import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { IPaginationResponse } from "@/interface/apiResponse.interface";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";

export interface ICompanyListItem {
  id: string;
  companyName: string;
  country: {
    id: string;
    country: string;
  };
  sector: string;
  currency: string;
  LicenseNumberName: string;
  liscenseNumber: string;
  liscenseIssuedBy: string;
  liscenseImage: string[];
  state: string;
  city: string;
  street: string;
  area: string;
  contactPersonName: string;
  contactNumber: string;
  email: string;
  officeAddress: string;
  websiteUrl: string;
}
export type CompanyListResponse = IPaginationResponse<ICompanyListItem>;

const useCompanyList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: CompanyListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.company.list,
    params: {
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.company.list,
  });

  return {
    companyListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useCompanyList;
