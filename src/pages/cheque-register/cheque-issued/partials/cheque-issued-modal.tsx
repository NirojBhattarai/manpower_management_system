import React from "react";
import ModalWrapper from "@/components/shadcn/modal-wrapper";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import DeleteModal from "@/components/DeleteModal";
import UpdateChequeIssued from "./update-cheque-issued";
import CreateChequeIssued from "./create-cheque-issued";

const ChequeIssuedModal = () => {
  const addModal = useAddModal(
    QUERY_PARAMS.chequeRegister.chequeIssued.createChequeIssued.key,
    QUERY_PARAMS.chequeRegister.chequeIssued.createChequeIssued.value,
  );
  const updateModal = useQueryParamState(
    QUERY_PARAMS.chequeRegister.chequeIssued.updateChequeIssued.key,
  );
  const deleteModal = useDelete({
    endpoints: endpoints.chequeIssued.delete,
    invalidates: [apiTags.chequeRegister.chequeIssued.list],
  });
  return (
    <React.Fragment>
      {/* ============================== Create Cheque Issued ============================== */}
      <ModalWrapper
        name="Create Issued Cheque"
        description="Provide the necessary details below to create and save an issued cheque record."
        onOpenChange={addModal.handleCloseModal}
        isOpen={addModal.isOpen}
      >
        <CreateChequeIssued />
      </ModalWrapper>

      {/* ============================== Update Cheque Issued ============================== */}
      <ModalWrapper
        name="Update Issued Cheque"
        description="Update the details below to modify and save the issued cheque record."
        onOpenChange={updateModal.clearValue}
        isOpen={updateModal.isActive}
      >
        <UpdateChequeIssued />
      </ModalWrapper>

      {/* ============================== Delete Cheque Issued ============================== */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onCancel={deleteModal.handleCancel}
        onConfirm={deleteModal.handleDelete}
      />
    </React.Fragment>
  );
};

export default ChequeIssuedModal;
