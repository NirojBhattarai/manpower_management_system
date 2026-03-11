import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

export default function CountryHeader() {
  const addModal = useAddModal(
    QUERY_PARAMS.country.createCountry.key,
    QUERY_PARAMS.country.createCountry.value,
  );
  return (
    <React.Fragment>
      <PageHeader title="Country" />
      <SearchFilter
        dateFilter={false}
        handleAddClick={addModal.handleOpenModal}
      />
    </React.Fragment>
  );
}
