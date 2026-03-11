import { endpoints } from "@/api/endpoints";
import DeleteModal from "@/components/DeleteModal";
import { apiTags } from "@/constant/tag";
import { useDelete } from "@/hooks/useDelete";
import React from "react";

const QuickPaymentModal = () => {
  const deleteQuickPayment = useDelete({
    endpoints: endpoints.quickPayment.delete,
    invalidates: [apiTags.quickPayment.list],
  });
  return (
    <React.Fragment>
      <DeleteModal
        onCancel={deleteQuickPayment.handleCancel}
        onConfirm={deleteQuickPayment.handleDelete}
        isOpen={deleteQuickPayment.isOpen}
      />
    </React.Fragment>
  );
};

export default QuickPaymentModal;
