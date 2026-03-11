import React from "react";
import ModalWrapper from "@/components/shadcn/modal-wrapper";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import DeleteModal from "@/components/DeleteModal";
import CreateChequeReceived from "./create-cheque-received";
import UpdateChequeReceived from "./update-cheque-received";

const ChequeReceivedModal = () => {
  const addModal = useAddModal(
    QUERY_PARAMS.chequeRegister.chequeReceived.createChequeReceived.key,
    QUERY_PARAMS.chequeRegister.chequeReceived.createChequeReceived.value,
  );
  const updateModal = useQueryParamState(
    QUERY_PARAMS.chequeRegister.chequeReceived.updateChequeReceived.key,
  );
  const deleteModal = useDelete({
    endpoints: endpoints.chequeReceived.delete,
    invalidates: [apiTags.chequeRegister.chequeReceived.list],
  });
  return (
    <React.Fragment>
      {/* ============================== Create Cheque Received ============================== */}
      <ModalWrapper
        name="Create Received Cheque"
        description="Provide the necessary details below to create and save an received cheque record."
        onOpenChange={addModal.handleCloseModal}
        isOpen={addModal.isOpen}
      >
        <CreateChequeReceived />
      </ModalWrapper>

      {/* ============================== Update Cheque Received ============================== */}
      <ModalWrapper
        name="Update Received Cheque"
        description="Update the details below to modify and save the received cheque record."
        onOpenChange={updateModal.clearValue}
        isOpen={updateModal.isActive}
      >
        <UpdateChequeReceived />
      </ModalWrapper>

      {/* ============================== Delete Cheque Received ============================== */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onCancel={deleteModal.handleCancel}
        onConfirm={deleteModal.handleDelete}
      />
    </React.Fragment>
  );
};

export default ChequeReceivedModal;
