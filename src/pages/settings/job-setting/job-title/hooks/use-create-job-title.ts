import { usePostDataMutation } from "@/api/api";
import { useAddModal } from "@/hooks/use-add-modal";
import {
  JobTitleSchemaType,
  JobTitleValidationSchema,
} from "../schema/job-title-schema";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import QUERY_PARAMS from "@/constant/query-params";
import useGetAllIndustry from "../../industry/hooks/use-get-all-industry";
import useCategoryList from "../../category/hooks/use-category-list";
import useSubCategoryList from "../../sub-category/hooks/use-sub-category-list";
import { IOption } from "@/components/form/form-input-select";

const useCreateJobTitle = () => {
  const [createJobTitle, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.jobsetting.jobTitle.createJobTitle.key,
    QUERY_PARAMS.jobsetting.jobTitle.createJobTitle.value,
  );
  const initialValues: JobTitleSchemaType = {
    industry: "",
    category: "",
    subcategory: "",
    jobtitle: "",
    icon: "",
  };

  const formik = useFormik<JobTitleSchemaType>({
    initialValues,
    validationSchema: JobTitleValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const formData = new FormData();
      formData.append("industry", values.industry);
      formData.append("category", values.category);
      formData.append("subcategory", values.subcategory);
      formData.append("jobtitle", values.jobtitle);
      if (values?.icon && values?.icon instanceof File)
        formData.append("icon", values.icon);

      const response = (await createJobTitle({
        url: endpoints.jobsetting.jobTitle.create,
        data: formData,
        invalidateTag: [apiTags.jobTitle.list],
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

  return { formik, isLoading, categories, subcategories, industries };
};
export default useCreateJobTitle;
