import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

export default function EducationHeader() {
  const addModal = useAddModal(
    QUERY_PARAMS.education.createEducation.key,
    QUERY_PARAMS.education.createEducation.value,
  );
  return (
    <React.Fragment>
      <PageHeader title="Education" />
      <SearchFilter
        dateFilter={false}
        handleAddClick={addModal.handleOpenModal}
      />
    </React.Fragment>
  );
}
