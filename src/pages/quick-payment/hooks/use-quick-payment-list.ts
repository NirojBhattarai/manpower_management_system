import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useState } from "react";
import { QuickPaymentListResponse } from "../interface/quick-payment-interface";
import { useDebounce } from "@/utils/useDebounce";

const useQuickPaymentList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedsearch = useDebounce<string>(get(), 500);

  const { data, isLoading } = useGetDataQuery<{
    data: QuickPaymentListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.quickPayment.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedsearch,
    },
    tag: apiTags.quickPayment.list,
  });
  return {
    quickPaymentListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};

export default useQuickPaymentList;
