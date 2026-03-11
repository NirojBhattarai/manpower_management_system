import { endpoints } from "@/api/endpoints";
import DeleteModal from "@/components/DeleteModal";
import { apiTags } from "@/constant/tag";
import { useDelete } from "@/hooks/useDelete";
import React from "react";

const PreApprovalDofeModal = () => {
  const deletePreApprovalDofe = useDelete({
    endpoints: endpoints.preApprovalDofe.delete,
    invalidates: [apiTags.preApprovalDofe.list],
  });
  return (
    <React.Fragment>
      <DeleteModal
        isOpen={deletePreApprovalDofe.isOpen}
        onCancel={deletePreApprovalDofe.handleCancel}
        onConfirm={deletePreApprovalDofe.handleDelete}
      />
    </React.Fragment>
  );
};
export default PreApprovalDofeModal;
