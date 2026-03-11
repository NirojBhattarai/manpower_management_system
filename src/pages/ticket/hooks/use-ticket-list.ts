import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useState } from "react";
import { TicketListResponse } from "../interface/ticket-interface";
import { useDebounce } from "@/utils/useDebounce";

const useTicketList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);

  const { data, isLoading } = useGetDataQuery<{
    data: TicketListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.ticket.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.ticket.list,
  });

  return {
    ticketListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useTicketList;
