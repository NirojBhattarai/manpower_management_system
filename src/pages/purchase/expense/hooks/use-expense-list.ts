import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useState } from "react";
import { ExpenseListResponse } from "../interface/interface-expense";
import { useDebounce } from "@/utils/useDebounce";

const useExpenseList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedsearch = useDebounce<string>(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: ExpenseListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.expense.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedsearch,
    },
    tag: apiTags.expense.list,
  });

  return {
    expenseListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useExpenseList;
