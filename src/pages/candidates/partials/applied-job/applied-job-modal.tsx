import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import CreateAppliedJob from "./create-applied-job";
import UpdateAppliedJob from "./update-applied-job";
import CreateInterviewSchedule from "./partials/CreateInterviewSchedule";

export default function AppliedJobModal() {
  const addModal = useAddModal(
    QUERY_PARAMS.appliedJob.createAppliedJob.key,
    QUERY_PARAMS.appliedJob.createAppliedJob.value,
  );

  const updateAppliedJob = useQueryParamState(
    QUERY_PARAMS.appliedJob.updateAppliedJob.key,
  );

  const scheduleInterview = useQueryParamState(
    QUERY_PARAMS.interviewSchedule.createInterviewSchedule.key,
  );

  const deleteAppliedJob = useDelete({
    endpoints: endpoints.candidates.appliedJob.delete,
    invalidates: [apiTags.candidates.appliedJob.list],
  });

  return (
    <React.Fragment>
      {/* ========== Create Applied Job Modal ====== */}
      <ModalWrapper
        isOpen={addModal.isOpen}
        name="Create Applied Job"
        description="This action will create new applied job"
        className="xl:max-w-xl"
        onOpenChange={addModal.handleCloseModal}
      >
        <CreateAppliedJob />
      </ModalWrapper>

      {/* ========== Update Applied Job Modal =============== */}
      <ModalWrapper
        isOpen={updateAppliedJob.isActive}
        name="Update Applied Job"
        description="This action will update existing applied job"
        className="xl:max-w-xl"
        onOpenChange={updateAppliedJob.clearValue}
      >
        <UpdateAppliedJob />
      </ModalWrapper>

      {/* ========== Delete Applied Job Modal =============== */}
      <DeleteModal
        isOpen={deleteAppliedJob.isOpen}
        onCancel={deleteAppliedJob.handleCancel}
        onConfirm={deleteAppliedJob.handleDelete}
        isLoading={deleteAppliedJob.isLoading}
      />

      {/* ========= Interview Schedule Modal =============== */}
      <ModalWrapper
        isOpen={scheduleInterview.isActive}
        name="Schedule Interview"
        description="This action will schedule interview for candidate"
        className="xl:max-w-xl"
        onOpenChange={scheduleInterview.clearValue}
      >
        <CreateInterviewSchedule />
      </ModalWrapper>
    </React.Fragment>
  );
}
