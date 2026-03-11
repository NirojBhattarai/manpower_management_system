import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { IPaginationResponse } from "@/interface/apiResponse.interface";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";

export interface IDocumentListItem {
  id: string;
  country: {
    id: string;
    country: string;
  };
  document: string;
}
type DocumentListResponse = IPaginationResponse<IDocumentListItem>;

const useDocumentList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: DocumentListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.document.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.document.list,
  });

  return {
    documentListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useDocumentList;
