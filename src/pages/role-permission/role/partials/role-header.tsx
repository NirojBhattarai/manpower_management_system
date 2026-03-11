import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

export default function RoleHeader() {
  const addModal = useAddModal(
    QUERY_PARAMS.role.createRole.key,
    QUERY_PARAMS.role.createRole.value,
  );
  return (
    <React.Fragment>
      <PageHeader title="Role Management" />
      <SearchFilter
        dateFilter={false}
        handleAddClick={addModal.handleOpenModal}
      />
    </React.Fragment>
  );
}
