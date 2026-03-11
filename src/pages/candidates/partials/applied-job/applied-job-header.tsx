import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";
import { approvalStatusOption } from "./form/applied-job-form";
import { interviewStatusOption } from "./partials/form/interview-schedule-form";

export default function AppliedJobHeader() {
  const addModal = useAddModal(
    QUERY_PARAMS.appliedJob.createAppliedJob.key,
    QUERY_PARAMS.appliedJob.createAppliedJob.value,
  );
  return (
    <React.Fragment>
      <PageHeader title="Applied Job" />
      <SearchFilter
        dateFilter={false}
        selectFilter={[
          {
            placeholder: "Select Job Approval Status",
            option: approvalStatusOption,
            paramsKey: "job-approval-status-filter",
          },
          {
            placeholder: "Select Interview Status",
            option: interviewStatusOption,
            paramsKey: "interview-status-filter",
          },
        ]}
        handleAddClick={addModal.handleOpenModal}
      />
    </React.Fragment>
  );
}
