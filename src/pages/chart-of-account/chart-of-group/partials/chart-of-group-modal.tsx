import { endpoints } from "@/api/endpoints";
import DeleteModal from "@/components/DeleteModal";
import ModalWrapper from "@/components/shadcn/modal-wrapper";
import { apiTags } from "@/constant/tag";
import { useAddModal } from "@/hooks/use-add-modal";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useDelete } from "@/hooks/useDelete";
import React from "react";
import CreateChartOfGroup from "./create-chart-of-group";
import UpdateChartOfGroup from "./update-chart-of-group";
import QUERY_PARAMS from "@/constant/query-params";

const ChartOfGroupModal = () => {
  const addModal = useAddModal(
    QUERY_PARAMS.chartOfAccount.group.createGroup.key,
    QUERY_PARAMS.chartOfAccount.group.createGroup.value,
  );
  const updateModal = useUpdateModal(
    QUERY_PARAMS.chartOfAccount.group.updateGroup.key,
  );
  const deleteChartOfGroup = useDelete({
    endpoints: endpoints.chartOfAccount.group.delete,
    invalidates: [apiTags.chartOfAccount.group.list],
  });

  return (
    <React.Fragment>
      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteChartOfGroup.isOpen}
        onCancel={deleteChartOfGroup.handleCancel}
        onConfirm={deleteChartOfGroup.handleDelete}
      />

      {/* Create Chart Of Account */}
      <ModalWrapper
        className="xl:max-w-xl"
        isOpen={addModal.isOpen}
        name="Create chart of group"
        onOpenChange={addModal.handleCloseModal}
      >
        <CreateChartOfGroup />
      </ModalWrapper>

      {/* Update Chart Of Account */}
      <ModalWrapper
        className="xl:max-w-xl"
        isOpen={updateModal.isOpen}
        name="Update chart of group"
        onOpenChange={updateModal.handleCloseModal}
      >
        <UpdateChartOfGroup />
      </ModalWrapper>
    </React.Fragment>
  );
};

export default ChartOfGroupModal;
