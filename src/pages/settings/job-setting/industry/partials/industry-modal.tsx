import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import UpdateIndustry from "./update-industry";
import CreateIndustry from "./create-industry";

export default function IndustryModal() {
  const createIndustry = useAddModal(
    QUERY_PARAMS.jobsetting.industry.createIndustry.key,
    QUERY_PARAMS.jobsetting.industry.createIndustry.value,
  );

  const updateIndustry = useQueryParamState(
    QUERY_PARAMS.jobsetting.industry.updateIndustry.key,
  );

  const deleteIndustry = useDelete({
    endpoints: endpoints.jobsetting.industry.delete,
    invalidates: [apiTags.industry.list],
  });

  return (
    <React.Fragment>
      {/* =========== Create Industry ================ */}
      <ModalWrapper
        isOpen={createIndustry.isOpen}
        onOpenChange={createIndustry.handleCloseModal}
        name="Create Industry"
        description="This action will create industry"
        className="xl:max-w-2xl"
      >
        <CreateIndustry />
      </ModalWrapper>

      {/* =========== Update Industry ================ */}
      <ModalWrapper
        isOpen={updateIndustry.isActive}
        onOpenChange={updateIndustry.clearValue}
        name="Update Industry"
        description="This action will update the industry"
        className="xl:max-w-2xl"
      >
        <UpdateIndustry />
      </ModalWrapper>

      {/* =========== Delete Industry ================ */}
      <DeleteModal
        isOpen={deleteIndustry.isOpen}
        onCancel={deleteIndustry.handleCancel}
        onConfirm={deleteIndustry.handleDelete}
      />
    </React.Fragment>
  );
}
