import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import CreateMedicalInstitute from "./create-medical-institute";
import UpdateMedicalInstitute from "./update-medical-institute";
import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";

export default function MedicalInstituteModal() {
  const createMedicalInstitute = useAddModal(
    QUERY_PARAMS.setting.medicalInstitute.createMedicalInstitute.key,
    QUERY_PARAMS.setting.medicalInstitute.createMedicalInstitute.value
  );

  const updateMedicalInstitute = useQueryParamState(
    QUERY_PARAMS.setting.medicalInstitute.updateMedicalInstitute.key
  );

  const deleteMedicalInstitute = useDelete({
    endpoints: endpoints.medicalInstitute.delete,
    invalidates: [apiTags.medicalInstitute.list],
  });
  return (
    <React.Fragment>
      {/* =========== Create Medical Institute ================ */}
      <ModalWrapper
        isOpen={createMedicalInstitute.isOpen}
        onOpenChange={createMedicalInstitute.handleCloseModal}
        name="Create Medical Institute"
        description="This action will create medical institute"
        className="xl:max-w-2xl"
      >
        <CreateMedicalInstitute />
      </ModalWrapper>

      {/* =========== Update Medical Institute ================ */}
      <ModalWrapper
        isOpen={updateMedicalInstitute.isActive}
        onOpenChange={updateMedicalInstitute.clearValue}
        name="Update Medical Institute"
        description="This action will update the medical institute"
        className="xl:max-w-2xl"
      >
        <UpdateMedicalInstitute />
      </ModalWrapper>

      {/* =========== Delete Medical Institute ================ */}
      <DeleteModal
        isOpen={deleteMedicalInstitute.isOpen}
        onCancel={deleteMedicalInstitute.handleCancel}
        onConfirm={deleteMedicalInstitute.handleDelete}
      />
    </React.Fragment>
  );
}
