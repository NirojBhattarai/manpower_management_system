import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import CreateDocument from "./create-document";
import UpdateDocument from "./update-document";

export default function DocumentModal() {
  const addModal = useAddModal(
    QUERY_PARAMS.setting.documentSetting.createDocument.key,
    QUERY_PARAMS.setting.documentSetting.createDocument.value,
  );
  const updateDocument = useQueryParamState(
    QUERY_PARAMS.setting.documentSetting.updateDocument.key,
  );

  const deleteDocument = useDelete({
    endpoints: endpoints.document.delete,
    invalidates: [apiTags.document.list],
  });
  return (
    <React.Fragment>
      {/* ========== Create Document Modal ====== */}
      <ModalWrapper
        isOpen={addModal.isOpen}
        name="Create Document"
        description="This action will create new document"
        className="xl:max-w-xl"
        onOpenChange={addModal.handleCloseModal}
      >
        <CreateDocument />
      </ModalWrapper>

      {/* ========== Update Document Modal =============== */}
      <ModalWrapper
        isOpen={updateDocument.isActive}
        name="Update Document"
        description="This action will update existing document"
        className="xl:max-w-xl"
        onOpenChange={updateDocument.clearValue}
      >
        <UpdateDocument />
      </ModalWrapper>

      {/* ========== Delete Document Modal =============== */}
      <DeleteModal
        isOpen={deleteDocument.isOpen}
        onCancel={deleteDocument.handleCancel}
        onConfirm={deleteDocument.handleDelete}
        isLoading={deleteDocument.isLoading}
      />
    </React.Fragment>
  );
}
