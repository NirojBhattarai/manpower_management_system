import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import CreateUser from "./create-user";
import UpdateUser from "./update-user";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import DeleteModal from "@/components/DeleteModal";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { useDelete } from "@/hooks/useDelete";

export default function UserModal() {
  const createUser = useAddModal(
    QUERY_PARAMS.user.createUser.key,
    QUERY_PARAMS.user.createUser.value
  );
  const updateUser = useQueryParamState(QUERY_PARAMS.user.updateUser.key);
  const deleteUser = useDelete({
    endpoints: endpoints.user.delete,
    invalidates: [apiTags.user.list],
  });

  return (
    <React.Fragment>
      {/* =============== Create User Modal =============== */}
      <ModalWrapper
        className="xl:max-w-xl"
        name="Create User"
        description="This action will create new user"
        onOpenChange={createUser.handleCloseModal}
        isOpen={createUser.isOpen}
      >
        <CreateUser />
      </ModalWrapper>

      {/* =============== Update User Modal =============== */}
      <ModalWrapper
        className="xl:max-w-xl"
        name="Update User"
        description="This action will update the existing user"
        onOpenChange={updateUser.clearValue}
        isOpen={updateUser.isActive}
      >
        <UpdateUser />
      </ModalWrapper>

      {/* ====================== Delete User ===================== */}
      <DeleteModal
        isOpen={deleteUser.isOpen}
        onCancel={deleteUser.handleCancel}
        onConfirm={deleteUser?.handleDelete}
      />
    </React.Fragment>
  );
}
