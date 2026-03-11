import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

export default function InsuranceCompanyHeader() {
  const addInsuranceComapny = useAddModal(
    QUERY_PARAMS.setting.insuranceComapany.createInsuranceComapany.key,
    QUERY_PARAMS.setting.insuranceComapany.createInsuranceComapany.value
  );
  return (
    <React.Fragment>
      <PageHeader title="Insurance Company" />
      <SearchFilter
        dateFilter
        handleAddClick={addInsuranceComapny.handleOpenModal}
      />
    </React.Fragment>
  );
}
