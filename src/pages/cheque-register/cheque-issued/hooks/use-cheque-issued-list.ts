import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";
import { ChequeIssuedListResponse } from "../interface/issued-cheque-interface";

const useIssuedChequeList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce(get(), 500);

  const { data, isLoading } = useGetDataQuery<{
    data: ChequeIssuedListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.chequeIssued.list,
    params: {
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.chequeRegister.chequeIssued.list,
  });

  return {
    issuedChequeListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useIssuedChequeList;
