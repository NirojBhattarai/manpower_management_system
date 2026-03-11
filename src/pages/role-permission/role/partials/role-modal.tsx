import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import CreateRole from "./create-role";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import UpdateRole from "./update-role";

export default function RoleModal() {
  const addModal = useAddModal(
    QUERY_PARAMS.role.createRole.key,
    QUERY_PARAMS.role.createRole.value,
  );
  const updateRole = useQueryParamState(QUERY_PARAMS.role.updateRole.key);

  const deleteRole = useDelete({
    endpoints: endpoints.role.delete,
    invalidates: [apiTags.role.list],
  });
  return (
    <React.Fragment>
      {/* ========== Create Role Modal ====== */}
      <ModalWrapper
        isOpen={addModal.isOpen}
        name="Create Role"
        description="This action will create new role"
        className="xl:max-w-xl"
        onOpenChange={addModal.handleCloseModal}
      >
        <CreateRole />
      </ModalWrapper>

      {/* ========== Update Role Modal =============== */}
      <ModalWrapper
        isOpen={updateRole.isActive}
        name="Update Role"
        description="This action will update existing role"
        className="xl:max-w-xl"
        onOpenChange={updateRole.clearValue}
      >
        <UpdateRole />
      </ModalWrapper>
      {/* ========== Delete Role Modal =============== */}
      <DeleteModal
        isOpen={deleteRole.isOpen}
        onCancel={deleteRole.handleCancel}
        onConfirm={deleteRole.handleDelete}
        isLoading={deleteRole.isLoading}
      />
    </React.Fragment>
  );
}
