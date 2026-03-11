import { useFormik } from "formik";

import { usePostDataMutation } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import { useAddModal } from "@/hooks/use-add-modal";
import {
  SubCategorySchemaType,
  SubCategoryValidationSchema,
} from "../schema/sub-category-schema";
import useGetAllIndustry from "../../industry/hooks/use-get-all-industry";
import { IOption } from "@/components/form/form-input-select";
import useCategoryList from "../../category/hooks/use-category-list";
import QUERY_PARAMS from "@/constant/query-params";

const useCreateSubCategory = () => {
  const [createSubCategory, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.jobsetting.subCategory.createSubCategory.key,
    QUERY_PARAMS.jobsetting.subCategory.createSubCategory.value,
  );
  const initialValues: SubCategorySchemaType = {
    industry: "",
    category: "",
    subcategory: "",
    icon: "",
  };

  const formik = useFormik<SubCategorySchemaType>({
    initialValues,
    validationSchema: SubCategoryValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const formData = new FormData();
      formData.append("industry", values.industry);
      formData.append("category", values.category);
      formData.append("subcategory", values.subcategory);
      if (values?.icon && values?.icon instanceof File)
        formData.append("icon", values.icon);

      const response = (await createSubCategory({
        url: endpoints.jobsetting.subCategory.create,
        data: formData,
        invalidateTag: [apiTags.subCategory.list],
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

  return { formik, isLoading, industries, categories };
};

export default useCreateSubCategory;
