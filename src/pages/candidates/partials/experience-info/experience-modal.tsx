import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import CreateExperience from "./create-experience";
import UpdateExperience from "./update-experience";

export default function ExperienceModal() {
  const addModal = useAddModal(
    QUERY_PARAMS.experience.createExperience.key,
    QUERY_PARAMS.experience.createExperience.value,
  );
  const updateExperience = useQueryParamState(
    QUERY_PARAMS.experience.updateExperience.key,
  );

  const deleteExperience = useDelete({
    endpoints: endpoints.candidates.experience.delete,
    invalidates: [apiTags.candidates.experience.list],
  });
  return (
    <React.Fragment>
      {/* ========== Create Experience Modal ====== */}
      <ModalWrapper
        isOpen={addModal.isOpen}
        name="Create Experience"
        description="This action will create new experience"
        className="xl:max-w-xl"
        onOpenChange={addModal.handleCloseModal}
      >
        <CreateExperience />
      </ModalWrapper>

      {/* ========== Update Experience Modal =============== */}
      <ModalWrapper
        isOpen={updateExperience.isActive}
        name="Update Experience"
        description="This action will update existing experience"
        className="xl:max-w-xl"
        onOpenChange={updateExperience.clearValue}
      >
        <UpdateExperience />
      </ModalWrapper>

      {/* ========== Delete Experience Modal =============== */}
      <DeleteModal
        isOpen={deleteExperience.isOpen}
        onCancel={deleteExperience.handleCancel}
        onConfirm={deleteExperience.handleDelete}
        isLoading={deleteExperience.isLoading}
      />
    </React.Fragment>
  );
}
