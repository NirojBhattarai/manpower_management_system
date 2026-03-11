import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

export default function BankHeader() {
  const addModal = useAddModal(
    QUERY_PARAMS.setting.bankSetting.createBank.key,
    QUERY_PARAMS.setting.bankSetting.createBank.value,
  );
  return (
    <React.Fragment>
      <PageHeader title="Bank Setting" />
      <SearchFilter
        dateFilter={false}
        handleAddClick={addModal.handleOpenModal}
      />
    </React.Fragment>
  );
}
