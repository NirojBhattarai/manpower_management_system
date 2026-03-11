import { endpoints } from "@/api/endpoints";
import DeleteModal from "@/components/DeleteModal";
import { apiTags } from "@/constant/tag";
import { useDelete } from "@/hooks/useDelete";
import React from "react";

const ExpenseModal = () => {
  const deleteExpense = useDelete({
    endpoints: endpoints.expense.delete,
    invalidates: [apiTags.expense.list],
  });
  return (
    <React.Fragment>
      <DeleteModal
        isOpen={deleteExpense.isOpen}
        onCancel={deleteExpense.handleCancel}
        onConfirm={deleteExpense?.handleDelete}
      />
    </React.Fragment>
  );
};

export default ExpenseModal;
