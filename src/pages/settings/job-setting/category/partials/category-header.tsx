import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

export default function CategoryHeader() {
  const addCategory = useAddModal(
    QUERY_PARAMS.jobsetting.category.createCategory.key,
    QUERY_PARAMS.jobsetting.category.createCategory.value,
  );
  return (
    <React.Fragment>
      <PageHeader title="Category" />
      <SearchFilter dateFilter handleAddClick={addCategory.handleOpenModal} />
    </React.Fragment>
  );
}
