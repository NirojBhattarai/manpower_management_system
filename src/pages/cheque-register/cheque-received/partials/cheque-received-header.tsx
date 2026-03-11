import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

const ChequeReceivedHeader = () => {
  const addModal = useAddModal(
    QUERY_PARAMS.chequeRegister.chequeReceived.createChequeReceived.key,
    QUERY_PARAMS.chequeRegister.chequeReceived.createChequeReceived.value,
  );
  return (
    <React.Fragment>
      <PageHeader title="Cheque Received" />
      <SearchFilter
        dateFilter={false}
        handleAddClick={addModal.handleOpenModal}
      />
    </React.Fragment>
  );
};

export default ChequeReceivedHeader;
