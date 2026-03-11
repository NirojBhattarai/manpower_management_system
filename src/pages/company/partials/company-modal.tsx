import React from "react";
import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";

export default function CompanyModal() {
  const deleteCompany = useDelete({
    endpoints: endpoints.company.delete,
    invalidates: [apiTags.company.list],
  });

  return (
    <React.Fragment>
      {/* =========== Delete Company ================ */}
      <DeleteModal
        isOpen={deleteCompany.isOpen}
        onCancel={deleteCompany.handleCancel}
        onConfirm={deleteCompany.handleDelete}
      />
    </React.Fragment>
  );
}
