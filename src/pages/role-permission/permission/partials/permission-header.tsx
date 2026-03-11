import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

export default function PermissionHeader() {
  const addModal = useAddModal(
    QUERY_PARAMS.permission.createPermission.key,
    QUERY_PARAMS.permission.createPermission.value,
  );
  return (
    <React.Fragment>
      <PageHeader title="Permission Management" />
      <SearchFilter
        dateFilter={false}
        handleAddClick={addModal.handleOpenModal}
      />
    </React.Fragment>
  );
}
