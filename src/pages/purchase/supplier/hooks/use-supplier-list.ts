import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";
import { SupplierListResponse } from "../interface/supplier-interface";

const useSupplierList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedsearch = useDebounce<string>(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: SupplierListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.supplier.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedsearch,
    },
    tag: apiTags.supplier.list,
  });

  return {
    supplierListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useSupplierList;
