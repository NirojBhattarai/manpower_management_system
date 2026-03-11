import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import CreatePermission from "./create-permission";
import UpdatePermission from "./update-permission";

export default function PermissionModal() {
  const addModal = useAddModal(
    QUERY_PARAMS.permission.createPermission.key,
    QUERY_PARAMS.permission.createPermission.value,
  );
  const updatePermission = useQueryParamState(
    QUERY_PARAMS.permission.updatePermission.key,
  );

  const deletePermission = useDelete({
    endpoints: endpoints.permission.delete,
    invalidates: [apiTags.permission.list],
  });
  return (
    <React.Fragment>
      {/* ========== Create Permission Modal ====== */}
      <ModalWrapper
        isOpen={addModal.isOpen}
        name="Create Permission"
        description="This action will create new permission"
        className="xl:max-w-xl"
        onOpenChange={addModal.handleCloseModal}
      >
        <CreatePermission />
      </ModalWrapper>

      {/* ========== Update Permission Modal =============== */}
      <ModalWrapper
        isOpen={updatePermission.isActive}
        name="Update Role"
        description="This action will update existing permission"
        className="xl:max-w-xl"
        onOpenChange={updatePermission.clearValue}
      >
        <UpdatePermission />
      </ModalWrapper>

      {/* ========== Delete Permission Modal =============== */}
      <DeleteModal
        isOpen={deletePermission.isOpen}
        onCancel={deletePermission.handleCancel}
        onConfirm={deletePermission.handleDelete}
        isLoading={deletePermission.isLoading}
      />
    </React.Fragment>
  );
}
