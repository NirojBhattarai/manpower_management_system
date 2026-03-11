import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useState } from "react";
import { InvoiceListResponse } from "../interface/invoice-interfaces";
import { useDebounce } from "@/utils/useDebounce";

const useInvoiceList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedsearch = useDebounce<string>(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: InvoiceListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.invoice.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedsearch,
    },
    tag: apiTags.invoice.list,
  });

  return {
    invoiceListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};

export default useInvoiceList;
