import { endpoints } from "@/api/endpoints";
import DeleteModal from "@/components/DeleteModal";
import ModalWrapper from "@/components/shadcn/modal-wrapper";
import { apiTags } from "@/constant/tag";
import { useAddModal } from "@/hooks/use-add-modal";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useDelete } from "@/hooks/useDelete";
import React from "react";
import CreateChartOfAccount from "./create-chart-of-account";
import UpdateChartOfAccount from "./update-chart-of-account";
import QUERY_PARAMS from "@/constant/query-params";

const ChartOfAccountModal = () => {
  const addModal = useAddModal(
    QUERY_PARAMS.chartOfAccount.account.createAccount.key,
    QUERY_PARAMS.chartOfAccount.account.createAccount.value,
  );
  const updateModal = useUpdateModal(
    QUERY_PARAMS.chartOfAccount.account.updateAccount.key,
  );
  const deleteChartOfAccount = useDelete({
    endpoints: endpoints.chartOfAccount.account.delete,
    invalidates: [apiTags.chartOfAccount.account.list],
  });
  return (
    <React.Fragment>
      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteChartOfAccount.isOpen}
        onCancel={deleteChartOfAccount.handleCancel}
        onConfirm={deleteChartOfAccount.handleDelete}
      />

      {/* Create Chart Of Account */}
      <ModalWrapper
        className="xl:max-w-xl"
        isOpen={addModal.isOpen}
        name="Create chart of account"
        onOpenChange={addModal.handleCloseModal}
      >
        <CreateChartOfAccount />
      </ModalWrapper>

      {/* Update Chart Of Account */}
      <ModalWrapper
        className="xl:max-w-xl"
        isOpen={updateModal.isOpen}
        name="Update chart of account"
        onOpenChange={updateModal.handleCloseModal}
      >
        <UpdateChartOfAccount />
      </ModalWrapper>
    </React.Fragment>
  );
};

export default ChartOfAccountModal;
