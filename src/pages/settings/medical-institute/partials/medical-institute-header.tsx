import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

export default function MedicalInstituteHeader() {
  const addMedicalInstitute = useAddModal(
    QUERY_PARAMS.setting.medicalInstitute.createMedicalInstitute.key,
    QUERY_PARAMS.setting.medicalInstitute.createMedicalInstitute.value
  );

  return (
    <React.Fragment>
      <PageHeader title="Medical Institute" />
      <SearchFilter
        dateFilter
        handleAddClick={addMedicalInstitute.handleOpenModal}
      />
    </React.Fragment>
  );
}
