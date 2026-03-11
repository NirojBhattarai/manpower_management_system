import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

const ChartOfAccountHeader = () => {
  const addModal = useAddModal(
    QUERY_PARAMS.chartOfAccount.account.createAccount.key,
    QUERY_PARAMS.chartOfAccount.account.createAccount.value,
  );
  return (
    <React.Fragment>
      <PageHeader title="Chart of Account" />
      <SearchFilter
        dateFilter={false}
        handleAddClick={addModal.handleOpenModal}
      />
    </React.Fragment>
  );
};

export default ChartOfAccountHeader;
