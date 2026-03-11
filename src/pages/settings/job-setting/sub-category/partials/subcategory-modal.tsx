import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import CreateSubCategory from "./create-sub-category";
import UpdateSubCategory from "./update-sub-category";

export default function SubCategoryModal() {
  const createSubCategory = useAddModal(
    QUERY_PARAMS.jobsetting.subCategory.createSubCategory.key,
    QUERY_PARAMS.jobsetting.subCategory.createSubCategory.value,
  );

  const updateSubCategory = useQueryParamState(
    QUERY_PARAMS.jobsetting.subCategory.updateSubCategory.key,
  );

  const deleteSubCategory = useDelete({
    endpoints: endpoints.jobsetting.subCategory.delete,
    invalidates: [apiTags.subCategory.list],
  });

  return (
    <React.Fragment>
      {/* =========== Create Sub Category ================ */}
      <ModalWrapper
        isOpen={createSubCategory.isOpen}
        onOpenChange={createSubCategory.handleCloseModal}
        name="Create Sub Category"
        description="This action will create  sub category"
        className="xl:max-w-2xl"
      >
        <CreateSubCategory />
      </ModalWrapper>

      {/* =========== Update Sub Category ================ */}
      <ModalWrapper
        isOpen={updateSubCategory.isActive}
        onOpenChange={updateSubCategory.clearValue}
        name="Update Sub Category"
        description="This action will update the category"
        className="xl:max-w-2xl"
      >
        <UpdateSubCategory />
      </ModalWrapper>

      {/* =========== Delete Sub Category ================ */}
      <DeleteModal
        isOpen={deleteSubCategory.isOpen}
        onCancel={deleteSubCategory.handleCancel}
        onConfirm={deleteSubCategory.handleDelete}
      />
    </React.Fragment>
  );
}
