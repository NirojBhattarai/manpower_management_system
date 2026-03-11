import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

export default function SubCategoryHeader() {
  const addSubCategory = useAddModal(
    QUERY_PARAMS.jobsetting.subCategory.createSubCategory.key,
    QUERY_PARAMS.jobsetting.subCategory.createSubCategory.value,
  );
  return (
    <React.Fragment>
      <PageHeader title="Sub Category" />
      <SearchFilter
        dateFilter
        handleAddClick={addSubCategory.handleOpenModal}
      />
    </React.Fragment>
  );
}
