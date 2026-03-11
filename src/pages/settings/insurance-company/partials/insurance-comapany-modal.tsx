import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import CreateInsuranceCompany from "./create-insurance-comapany";
import UpdateInsuranceCompany from "./update-insurance-company";
import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";

export default function InsuranceCompanyModal() {
  const createInsuranceComapany = useAddModal(
    QUERY_PARAMS.setting.insuranceComapany.createInsuranceComapany.key,
    QUERY_PARAMS.setting.insuranceComapany.createInsuranceComapany.value
  );

  const updateInsuranceCompany = useQueryParamState(
    QUERY_PARAMS.setting.insuranceComapany.updateInsuranceComapany.key
  );

  const deleteInsuranceCompany = useDelete({
    endpoints: endpoints.insuranceCompany.delete,
    invalidates: [apiTags.insuranceCompany.list],
  });
  return (
    <React.Fragment>
      {/* =========== Create Insurance Company ================ */}
      <ModalWrapper
        isOpen={createInsuranceComapany.isOpen}
        onOpenChange={createInsuranceComapany.handleCloseModal}
        name="Create Insurance Comapany"
        description="This action will create insurance company"
        className="xl:max-w-2xl"
      >
        <CreateInsuranceCompany />
      </ModalWrapper>

      {/* =========== Update Insurance Company ================ */}
      <ModalWrapper
        isOpen={updateInsuranceCompany.isActive}
        onOpenChange={updateInsuranceCompany.clearValue}
        name="Update Insurance Company"
        description="This action will update the insurance company"
        className="xl:max-w-2xl"
      >
        <UpdateInsuranceCompany />
      </ModalWrapper>

      {/* =========== Delete Insurance Company ================ */}
      <DeleteModal
        isOpen={deleteInsuranceCompany.isOpen}
        onCancel={deleteInsuranceCompany.handleCancel}
        onConfirm={deleteInsuranceCompany.handleDelete}
      />
    </React.Fragment>
  );
}
