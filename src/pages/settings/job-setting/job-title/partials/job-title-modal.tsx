import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import CreateJobTitle from "./create-job-title";
import UpdateJobTitle from "./update-job-title";

export default function JobTitleModal() {
  const createJobTitle = useAddModal(
    QUERY_PARAMS.jobsetting.jobTitle.createJobTitle.key,
    QUERY_PARAMS.jobsetting.jobTitle.createJobTitle.value,
  );

  const updateJobTitle = useQueryParamState(
    QUERY_PARAMS.jobsetting.jobTitle.updateJobTitle.key,
  );

  const deleteJobTitle = useDelete({
    endpoints: endpoints.jobsetting.jobTitle.delete,
    invalidates: [apiTags.jobTitle.list],
  });

  return (
    <React.Fragment>
      {/* =========== Create Job Title ================ */}
      <ModalWrapper
        isOpen={createJobTitle.isOpen}
        onOpenChange={createJobTitle.handleCloseModal}
        name="Create Job Title"
        description="This action will create job title"
        className="xl:max-w-2xl"
      >
        <CreateJobTitle />
      </ModalWrapper>

      {/* =========== Update Job Title ================ */}
      <ModalWrapper
        isOpen={updateJobTitle.isActive}
        onOpenChange={updateJobTitle.clearValue}
        name="Update Job Title"
        description="This action will update the job title"
        className="xl:max-w-2xl"
      >
        <UpdateJobTitle />
      </ModalWrapper>

      {/* =========== Delete Job Title ================ */}
      <DeleteModal
        isOpen={deleteJobTitle.isOpen}
        onCancel={deleteJobTitle.handleCancel}
        onConfirm={deleteJobTitle.handleDelete}
      />
    </React.Fragment>
  );
}
