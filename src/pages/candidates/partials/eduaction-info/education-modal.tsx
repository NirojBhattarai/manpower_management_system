import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import CreateEducation from "./create-education";
import UpdateEducation from "./update-education";

export default function EducationModal() {
  const addModal = useAddModal(
    QUERY_PARAMS.education.createEducation.key,
    QUERY_PARAMS.education.createEducation.value,
  );
  const updateEducation = useQueryParamState(
    QUERY_PARAMS.education.updateEducation.key,
  );

  const deleteEducation = useDelete({
    endpoints: endpoints.candidates.education.delete,
    invalidates: [apiTags.candidates.education.list],
  });
  return (
    <React.Fragment>
      {/* ========== Create Education Modal ====== */}
      <ModalWrapper
        isOpen={addModal.isOpen}
        name="Create Education"
        description="This action will create new education"
        className="xl:max-w-xl"
        onOpenChange={addModal.handleCloseModal}
      >
        <CreateEducation />
      </ModalWrapper>

      {/* ========== Update Education Modal =============== */}
      <ModalWrapper
        isOpen={updateEducation.isActive}
        name="Update Education"
        description="This action will update existing education"
        className="xl:max-w-xl"
        onOpenChange={updateEducation.clearValue}
      >
        <UpdateEducation />
      </ModalWrapper>

      {/* ========== Delete Education Modal =============== */}
      <DeleteModal
        isOpen={deleteEducation.isOpen}
        onCancel={deleteEducation.handleCancel}
        onConfirm={deleteEducation.handleDelete}
        isLoading={deleteEducation.isLoading}
      />
    </React.Fragment>
  );
}
