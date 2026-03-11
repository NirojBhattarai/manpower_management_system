import React from "react";
import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";

export default function CandidatesModal() {
  const deletePersonalDetails = useDelete({
    endpoints: endpoints.candidates.personalDetails.delete,
    invalidates: [apiTags.candidates.personalDetails.list],
  });
  return (
    <React.Fragment>
      {/* ========== Delete Document Modal =============== */}
      <DeleteModal
        isOpen={deletePersonalDetails.isOpen}
        onCancel={deletePersonalDetails.handleCancel}
        onConfirm={deletePersonalDetails.handleDelete}
        isLoading={deletePersonalDetails.isLoading}
      />
    </React.Fragment>
  );
}
