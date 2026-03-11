import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import CreateBank from "./create-bank";
import UpdateBank from "./update-bank";

export default function BankModal() {
  const addModal = useAddModal(
    QUERY_PARAMS.setting.bankSetting.createBank.key,
    QUERY_PARAMS.setting.bankSetting.createBank.value,
  );
  const updateBank = useQueryParamState(
    QUERY_PARAMS.setting.bankSetting.updateBank.key,
  );

  const deleteBank = useDelete({
    endpoints: endpoints.bank.delete,
    invalidates: [apiTags.bank.list],
  });
  return (
    <React.Fragment>
      {/* ========== Create Bank Modal ====== */}
      <ModalWrapper
        isOpen={addModal.isOpen}
        name="Create Bank"
        description="This action will create new bank"
        className="xl:max-w-xl"
        onOpenChange={addModal.handleCloseModal}
      >
        <CreateBank />
      </ModalWrapper>

      {/* ========== Update Bank Modal =============== */}
      <ModalWrapper
        isOpen={updateBank.isActive}
        name="Update Bank"
        description="This action will update existing document"
        className="xl:max-w-xl"
        onOpenChange={updateBank.clearValue}
      >
        <UpdateBank />
      </ModalWrapper>

      {/* ========== Delete Bank Modal =============== */}
      <DeleteModal
        isOpen={deleteBank.isOpen}
        onCancel={deleteBank.handleCancel}
        onConfirm={deleteBank.handleDelete}
        isLoading={deleteBank.isLoading}
      />
    </React.Fragment>
  );
}
