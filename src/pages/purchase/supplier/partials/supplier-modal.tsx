import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import CreateSupplier from "./create-supplier";
import { useAddModal } from "@/hooks/use-add-modal";
import UpdateSupplier from "./update-supplier";
import DeleteModal from "@/components/DeleteModal";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import QUERY_PARAMS from "@/constant/query-params";

export default function SupplierModal() {
  const addModal = useAddModal(
    QUERY_PARAMS.supplier.createSupplier.key,
    QUERY_PARAMS.supplier.createSupplier.value,
  );
  const updateModal = useUpdateModal(QUERY_PARAMS.supplier.updateSupplier.key);
  const deleteModal = useDelete({
    endpoints: endpoints.supplier.delete,
    invalidates: [apiTags.supplier.list],
  });
  return (
    <React.Fragment>
      {/* ================= Create Supplier ===================== */}
      <ModalWrapper
        onOpenChange={addModal.handleCloseModal}
        isOpen={addModal.isOpen}
        name="Create Supplier"
        description="This will create the supplier account"
        className="xl:max-w-xl"
      >
        <CreateSupplier />
      </ModalWrapper>

      {/* ================= Update Supplier ===================== */}
      <ModalWrapper
        onOpenChange={updateModal.handleCloseModal}
        isOpen={updateModal.isOpen}
        name="Update Supplier"
        description="This will update existing the supplier account"
        className="xl:max-w-xl"
      >
        <UpdateSupplier />
      </ModalWrapper>

      {/* ================= Delete Supplier ===================== */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onCancel={deleteModal.handleCancel}
        onConfirm={deleteModal.handleDelete}
      />
    </React.Fragment>
  );
}
