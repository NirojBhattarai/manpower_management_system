import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

export default function IndustryHeader() {
  const addIndustry = useAddModal(
    QUERY_PARAMS.jobsetting.industry.createIndustry.key,
    QUERY_PARAMS.jobsetting.industry.createIndustry.value,
  );
  return (
    <React.Fragment>
      <PageHeader title="Industry Company" />
      <SearchFilter dateFilter handleAddClick={addIndustry.handleOpenModal} />
    </React.Fragment>
  );
}
