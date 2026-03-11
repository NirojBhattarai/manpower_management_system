import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

export default function CertificateHeader() {
  const addModal = useAddModal(
    QUERY_PARAMS.certificate.createCertificate.key,
    QUERY_PARAMS.certificate.createCertificate.value,
  );
  return (
    <React.Fragment>
      <PageHeader title="Certificates" />
      <SearchFilter
        dateFilter={false}
        handleAddClick={addModal.handleOpenModal}
      />
    </React.Fragment>
  );
}
