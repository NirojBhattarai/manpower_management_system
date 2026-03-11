import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { IPaginationResponse } from "@/interface/apiResponse.interface";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";

export interface ICountryListItem {
  id: string;
  country: string;
  capital: string;
  currency: string;
  language: string;
}
export type CountryListResponse = IPaginationResponse<ICountryListItem>;

const useCountryList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: CountryListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.country.list,
    params: {
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.country.list,
  });

  return {
    countryListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useCountryList;
