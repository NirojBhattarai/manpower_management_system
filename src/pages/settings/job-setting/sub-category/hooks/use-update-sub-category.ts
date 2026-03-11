import { useUpdateDataMutation } from "@/api/api";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useSubCategoryDetails from "./use-sub-category-details";
import {
  SubCategorySchemaType,
  SubCategoryValidationSchema,
} from "../schema/sub-category-schema";
import useGetAllIndustry from "../../industry/hooks/use-get-all-industry";
import useCategoryList from "../../category/hooks/use-category-list";
import { IOption } from "@/components/form/form-input-select";

const useUpdateSubCategory = () => {
  const { updateId, handleCloseModal } = useUpdateModal();
  const [updateSubCategory, { isLoading }] = useUpdateDataMutation();
  const { subCategoryDetails, isLoading: isInitialLoading } =
    useSubCategoryDetails({
      id: updateId ?? "",
    });

  const initialValues: SubCategorySchemaType = {
    industry: subCategoryDetails?.data?.industry?.id || "",
    category: subCategoryDetails?.data?.category?.id || "",
    subcategory: subCategoryDetails?.data?.subcategory || "",
    icon: subCategoryDetails?.data?.icon || "",
  };

  const formik = useFormik<SubCategorySchemaType>({
    initialValues,
    validationSchema: SubCategoryValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const formData = new FormData();
      formData.append("industry", values.industry);
      formData.append("category", values.category);
      formData.append("subcategory", values.subcategory);
      if (values?.icon && values?.icon instanceof File)
        formData.append("icon", values.icon);

      const response = (await updateSubCategory({
        data: formData,
        url: endpoints.jobsetting.subCategory.update.replace(
          ":id",
          updateId ?? "",
        ),
        invalidateTag: [apiTags.subCategory.list, apiTags.subCategory.details],
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
  const { categoryListResponse: categoryList } = useCategoryList();

  const categories: IOption[] =
    categoryList?.data?.records.map((category) => ({
      label: `${category?.category}`,
      value: category?.id,
    })) || [];

  const industries: IOption[] =
    industryList?.data?.records.map((industry) => ({
      label: `${industry?.industry}`,
      value: industry?.id,
    })) || [];
  return { formik, isLoading, isInitialLoading, categories, industries };
};

export default useUpdateSubCategory;
