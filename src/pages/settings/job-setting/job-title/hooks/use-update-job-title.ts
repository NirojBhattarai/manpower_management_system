import { useUpdateDataMutation } from "@/api/api";
import { useUpdateModal } from "@/hooks/use-update-modal";
import useJobTitleDetails from "./use-job-title-details";
import {
  JobTitleSchemaType,
  JobTitleValidationSchema,
} from "../schema/job-title-schema";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useGetAllIndustry from "../../industry/hooks/use-get-all-industry";
import useCategoryList from "../../category/hooks/use-category-list";
import useSubCategoryList from "../../sub-category/hooks/use-sub-category-list";
import { IOption } from "@/components/form/form-input-select";

const useUpdateJobTitle = () => {
  const { updateId, handleCloseModal } = useUpdateModal();
  const [updateJobTitle, { isLoading }] = useUpdateDataMutation();
  const { jobTitleDetails, isLoading: isInitialLoading } = useJobTitleDetails({
    id: updateId ?? "",
  });

  const initialValues: JobTitleSchemaType = {
    industry: jobTitleDetails?.data?.industry?.id || "",
    category: jobTitleDetails?.data?.category?.id || "",
    subcategory: jobTitleDetails?.data?.subcategory?.id || "",
    jobtitle: jobTitleDetails?.data?.jobtitle || "",
    icon: jobTitleDetails?.data?.icon || "",
  };

  const formik = useFormik<JobTitleSchemaType>({
    initialValues,
    validationSchema: JobTitleValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const formData = new FormData();
      formData.append("industry", values.industry);
      formData.append("category", values.category);
      formData.append("subcategory", values.subcategory);
      formData.append("jobtitle", values.jobtitle);
      if (values?.icon && values?.icon instanceof File)
        formData.append("icon", values.icon);

      const response = (await updateJobTitle({
        data: formData,
        url: endpoints.jobsetting.jobTitle.update.replace(
          ":id",
          updateId ?? "",
        ),
        invalidateTag: [apiTags.jobTitle.list, apiTags.jobTitle.details],
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
  const { subCategoryListResponse: subCategoryList } = useSubCategoryList();

  const categories: IOption[] =
    categoryList?.data?.records.map((category) => ({
      label: `${category?.category}`,
      value: category?.id,
    })) || [];

  const subcategories: IOption[] =
    subCategoryList?.data?.records.map((subCategory) => ({
      label: `${subCategory?.subcategory}`,
      value: subCategory?.id,
    })) || [];

  const industries: IOption[] =
    industryList?.data?.records.map((industry) => ({
      label: `${industry?.industry}`,
      value: industry?.id,
    })) || [];

  return {
    formik,
    isLoading,
    isInitialLoading,
    categories,
    industries,
    subcategories,
  };
};
export default useUpdateJobTitle;
