import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import CreateMembership from "./create-membership";
import UpdateMembership from "./update-membership";

export default function MembershipModal() {
  const addModal = useAddModal(
    QUERY_PARAMS.membership.createMembership.key,
    QUERY_PARAMS.membership.createMembership.value,
  );
  const updateMembership = useQueryParamState(
    QUERY_PARAMS.membership.updateMembership.key,
  );

  return (
    <React.Fragment>
      {/* ========== Create Membership Modal ====== */}
      <ModalWrapper
        isOpen={addModal.isOpen}
        name="Create Membership"
        description="This action will create new membership"
        className="xl:max-w-xl"
        onOpenChange={addModal.handleCloseModal}
      >
        <CreateMembership />
      </ModalWrapper>

      {/* ========== Update Bank Modal =============== */}
      <ModalWrapper
        isOpen={updateMembership.isActive}
        name="Update Membership"
        description="This action will update existing membership"
        className="xl:max-w-xl"
        onOpenChange={updateMembership.clearValue}
      >
        <UpdateMembership />
      </ModalWrapper>
    </React.Fragment>
  );
}
