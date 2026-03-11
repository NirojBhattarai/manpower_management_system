import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

export default function DocumentHeader() {
  const addModal = useAddModal(
    QUERY_PARAMS.setting.documentSetting.createDocument.key,
    QUERY_PARAMS.setting.documentSetting.createDocument.value,
  );
  return (
    <React.Fragment>
      <PageHeader title="Documents Setting" />
      <SearchFilter
        dateFilter={false}
        handleAddClick={addModal.handleOpenModal}
      />
    </React.Fragment>
  );
}
