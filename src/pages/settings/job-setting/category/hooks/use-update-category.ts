import { useUpdateDataMutation } from "@/api/api";
import { useUpdateModal } from "@/hooks/use-update-modal";
import useCategoryDetails from "./use-category-details";
import {
  CategorySchemaType,
  CategoryValidationSchema,
} from "../schema/category-schema";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useGetAllIndustry from "../../industry/hooks/use-get-all-industry";
import { IOption } from "@/components/form/form-input-select";

const useUpdateCategory = () => {
  const { updateId, handleCloseModal } = useUpdateModal();
  const [updateCategory, { isLoading }] = useUpdateDataMutation();
  const { categoryDetails, isLoading: isInitialLoading } = useCategoryDetails({
    id: updateId ?? "",
  });

  const initialValues: CategorySchemaType = {
    category: categoryDetails?.data?.category || "",
    industry: categoryDetails?.data?.industry?.id || "",
    icon: categoryDetails?.data?.icon || "",
  };

  const formik = useFormik<CategorySchemaType>({
    initialValues,
    validationSchema: CategoryValidationSchema,
    enableReinitialize: true,
    onSubmit: async (value, { setErrors, resetForm }) => {
      const formData = new FormData();
      formData.append("industry", value.industry);
      formData.append("category", value.category);
      if (value?.icon && value?.icon instanceof File)
        formData.append("icon", value.icon);
      const response = (await updateCategory({
        data: formData,
        url: endpoints.jobsetting.category.update.replace(
          ":id",
          updateId ?? "",
        ),
        invalidateTag: [apiTags.category.list, apiTags.category.details],
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          resetForm();
          handleCloseModal();
        },
      });
    },
  });

  const { industryListResponse: industryList } = useGetAllIndustry();

  const industries: IOption[] =
    industryList?.data?.records.map((industry) => ({
      label: `${industry?.industry}`,
      value: industry?.id,
    })) || [];

  return { formik, isLoading, isInitialLoading, industries };
};

export default useUpdateCategory;
