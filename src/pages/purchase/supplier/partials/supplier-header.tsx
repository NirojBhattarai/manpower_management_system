import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

export default function SupplierHeader() {
  const addModal = useAddModal(
    QUERY_PARAMS.supplier.createSupplier.key,
    QUERY_PARAMS.supplier.createSupplier.value,
  );
  return (
    <React.Fragment>
      <PageHeader title="Supplier" />
      <SearchFilter
        dateFilter={false}
        handleAddClick={addModal.handleOpenModal}
      />
    </React.Fragment>
  );
}
