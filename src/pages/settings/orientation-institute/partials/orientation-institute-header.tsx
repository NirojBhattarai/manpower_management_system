import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

export default function OrientationInstituteHeader() {
  const addOrientationInstitute = useAddModal(
    QUERY_PARAMS.setting.orientationInstitute.createOrientationInstitute.key,
    QUERY_PARAMS.setting.orientationInstitute.createOrientationInstitute.value,
  );

  return (
    <React.Fragment>
      <PageHeader title="Orientation Institute" />
      <SearchFilter
        dateFilter
        handleAddClick={addOrientationInstitute.handleOpenModal}
      />
    </React.Fragment>
  );
}
