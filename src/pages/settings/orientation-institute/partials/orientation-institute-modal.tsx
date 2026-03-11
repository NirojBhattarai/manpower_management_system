import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import CreateOrientationInstitute from "./create-orientation-institute";
import UpdateOrientationInstitute from "./update-orientation-institute";
import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";

export default function OrientationInstituteModal() {
  const createOrientationInstitute = useAddModal(
    QUERY_PARAMS.setting.orientationInstitute.createOrientationInstitute.key,
    QUERY_PARAMS.setting.orientationInstitute.createOrientationInstitute.value,
  );

  const updateOrientationInstitute = useQueryParamState(
    QUERY_PARAMS.setting.orientationInstitute.updateOrientationInstitute.key,
  );

  const deleteOrientationInstitute = useDelete({
    endpoints: endpoints.orientationInstitute.delete,
    invalidates: [apiTags.orientationInstitute.list],
  });
  return (
    <React.Fragment>
      {/* =========== Create Orientation Institute ================ */}
      <ModalWrapper
        isOpen={createOrientationInstitute.isOpen}
        onOpenChange={createOrientationInstitute.handleCloseModal}
        name="Create Orientation Institute"
        description="This action will create new Orientation Institute"
        className="xl:max-w-2xl"
      >
        <CreateOrientationInstitute />
      </ModalWrapper>

      {/* =========== Update Orientation Institute ================ */}
      <ModalWrapper
        isOpen={updateOrientationInstitute.isActive}
        onOpenChange={updateOrientationInstitute.clearValue}
        name="Update Orientation Institute"
        description="This action will update existing Orientation Institute"
        className="xl:max-w-2xl"
      >
        <UpdateOrientationInstitute />
      </ModalWrapper>

      {/* =========== Delete Orientation Institute ================ */}
      <DeleteModal
        isOpen={deleteOrientationInstitute.isOpen}
        onCancel={deleteOrientationInstitute.handleCancel}
        onConfirm={deleteOrientationInstitute.handleDelete}
      />
    </React.Fragment>
  );
}
