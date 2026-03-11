import ModalWrapper from "@/components/shadcn/modal-wrapper";
import React from "react";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import CreateCategory from "./create-category";
import UpdateCategory from "./update-category";

export default function CategoryModal() {
  const createCategory = useAddModal(
    QUERY_PARAMS.jobsetting.category.createCategory.key,
    QUERY_PARAMS.jobsetting.category.createCategory.value,
  );

  const updateCategory = useQueryParamState(
    QUERY_PARAMS.jobsetting.category.updateCategory.key,
  );

  const deleteCategory = useDelete({
    endpoints: endpoints.jobsetting.category.delete,
    invalidates: [apiTags.category.list],
  });

  return (
    <React.Fragment>
      {/* =========== Create Category ================ */}
      <ModalWrapper
        isOpen={createCategory.isOpen}
        onOpenChange={createCategory.handleCloseModal}
        name="Create Category"
        description="This action will create category"
        className="xl:max-w-2xl"
      >
        <CreateCategory />
      </ModalWrapper>

      {/* =========== Update category ================ */}
      <ModalWrapper
        isOpen={updateCategory.isActive}
        onOpenChange={updateCategory.clearValue}
        name="Update Category"
        description="This action will update the category"
        className="xl:max-w-2xl"
      >
        <UpdateCategory />
      </ModalWrapper>

      {/* =========== Delete category ================ */}
      <DeleteModal
        isOpen={deleteCategory.isOpen}
        onCancel={deleteCategory.handleCancel}
        onConfirm={deleteCategory.handleDelete}
      />
    </React.Fragment>
  );
}
