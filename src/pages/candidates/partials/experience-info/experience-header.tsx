import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

export default function ExperienceHeader() {
  const addModal = useAddModal(
    QUERY_PARAMS.experience.createExperience.key,
    QUERY_PARAMS.experience.createExperience.value,
  );
  return (
    <React.Fragment>
      <PageHeader title="Experience" />
      <SearchFilter
        dateFilter={false}
        handleAddClick={addModal.handleOpenModal}
      />
    </React.Fragment>
  );
}
