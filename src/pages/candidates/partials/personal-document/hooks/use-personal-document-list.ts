import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";
import { PersonalDocumentListResponse } from "../interface/personal-document-interface";

const usePersonalDocumentList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce(get(), 500);
  const { data, isLoading } = useGetDataQuery<{
    data: PersonalDocumentListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.candidates.personalDocument.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedSearch,
    },
    tag: apiTags.candidates.personalDocument.list,
  });

  return {
    personalDocumentsListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};

export default usePersonalDocumentList;
