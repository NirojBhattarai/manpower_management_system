import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

const ChequeIssuedHeader = () => {
  const addModal = useAddModal(
    QUERY_PARAMS.chequeRegister.chequeIssued.createChequeIssued.key,
    QUERY_PARAMS.chequeRegister.chequeIssued.createChequeIssued.value
  );
  return (
    <React.Fragment>
      <PageHeader title="Cheque Issued" />
      <SearchFilter dateFilter={false} handleAddClick={addModal?.handleOpenModal} />
    </React.Fragment>
  );
};

export default ChequeIssuedHeader;
