import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { usePagination } from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useDebounce } from "@/utils/useDebounce";
import { useState } from "react";
import { MedicalListResponse } from "../interface/medical-interface";
import { useSearchParams } from "react-router-dom";

const useMedicalList = () => {
  const { pagination } = usePagination();
  const [rowSelection, setRowSelection] = useState({});
  const { get } = useSearch();
  const debouncedSearch = useDebounce<string>(get(), 500);

  const [searchParams] = useSearchParams();

  const visaStageFilter = searchParams.get("moved-to-visa-filter");
  const { data, isLoading } = useGetDataQuery<{
    data: MedicalListResponse;
    isLoading: boolean;
  }>({
    url: endpoints.medical.list,
    params: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
      search: debouncedSearch,
      isMovedToVisa: visaStageFilter || "",
    },
    tag: apiTags.medical.list,
  });

  return {
    medicalListResponse: data,
    isLoading,
    rowSelection,
    setRowSelection,
  };
};
export default useMedicalList;
