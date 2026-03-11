import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import CreateCountry from "./create-country";
import UpdateCountry from "./update-country";

export default function CountryModal() {
  const addModal = useAddModal(
    QUERY_PARAMS.country.createCountry.key,
    QUERY_PARAMS.country.createCountry.value,
  );
  const updateCountry = useQueryParamState(
    QUERY_PARAMS.country.updateCountry.key,
  );

  const deleteCountry = useDelete({
    endpoints: endpoints.country.delete,
    invalidates: [apiTags.country.list],
  });
  return (
    <React.Fragment>
      {/* ========== Create Country Modal ====== */}
      <ModalWrapper
        isOpen={addModal.isOpen}
        name="Create Country"
        description="This action will create new country"
        className="xl:max-w-xl"
        onOpenChange={addModal.handleCloseModal}
      >
        <CreateCountry />
      </ModalWrapper>

      {/* ========== Update Country Modal =============== */}
      <ModalWrapper
        isOpen={updateCountry.isActive}
        name="Update Country"
        description="This action will update existing country"
        className="xl:max-w-xl"
        onOpenChange={updateCountry.clearValue}
      >
        <UpdateCountry />
      </ModalWrapper>
      {/* ========== Delete Country Modal =============== */}
      <DeleteModal
        isOpen={deleteCountry.isOpen}
        onCancel={deleteCountry.handleCancel}
        onConfirm={deleteCountry.handleDelete}
        isLoading={deleteCountry.isLoading}
      />
    </React.Fragment>
  );
}
