import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import CreateCertificate from "./create-certificate";
import UpdateCertificate from "./update-certificate";

export default function CertificateModal() {
  const addModal = useAddModal(
    QUERY_PARAMS.certificate.createCertificate.key,
    QUERY_PARAMS.certificate.createCertificate.value,
  );
  const updateCertificate = useQueryParamState(
    QUERY_PARAMS.certificate.updateCertificate.key,
  );

  const deleteCertificate = useDelete({
    endpoints: endpoints.candidates.certificate.delete,
    invalidates: [apiTags.candidates.certificate.list],
  });
  return (
    <React.Fragment>
      {/* ========== Create Certificate Modal ====== */}
      <ModalWrapper
        isOpen={addModal.isOpen}
        name="Create Certificate"
        description="This action will create new certificate"
        className="xl:max-w-xl"
        onOpenChange={addModal.handleCloseModal}
      >
        <CreateCertificate />
      </ModalWrapper>

      {/* ========== Update Certificate Modal =============== */}
      <ModalWrapper
        isOpen={updateCertificate.isActive}
        name="Update Certificate"
        description="This action will update existing certificate"
        className="xl:max-w-xl"
        onOpenChange={updateCertificate.clearValue}
      >
        <UpdateCertificate />
      </ModalWrapper>

      {/* ========== Delete Certificate Modal =============== */}
      <DeleteModal
        isOpen={deleteCertificate.isOpen}
        onCancel={deleteCertificate.handleCancel}
        onConfirm={deleteCertificate.handleDelete}
        isLoading={deleteCertificate.isLoading}
      />
    </React.Fragment>
  );
}
