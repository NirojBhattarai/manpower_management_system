import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

export default function JobTitleHeader() {
  const addJobTitle = useAddModal(
    QUERY_PARAMS.jobsetting.jobTitle.createJobTitle.key,
    QUERY_PARAMS.jobsetting.jobTitle.createJobTitle.value,
  );
  return (
    <React.Fragment>
      <PageHeader title="Job Title" />
      <SearchFilter dateFilter handleAddClick={addJobTitle.handleOpenModal} />
    </React.Fragment>
  );
}
