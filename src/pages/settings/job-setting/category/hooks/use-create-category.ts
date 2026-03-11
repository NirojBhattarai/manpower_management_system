import { useFormik } from "formik";
import {
  CategorySchemaType,
  CategoryValidationSchema,
} from "../schema/category-schema";
import { usePostDataMutation } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import { useAddModal } from "@/hooks/use-add-modal";
import useGetAllIndustry from "../../industry/hooks/use-get-all-industry";
import { IOption } from "@/components/form/form-input-select";
import QUERY_PARAMS from "@/constant/query-params";

const useCreateCategory = () => {
  const [createCategory, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.jobsetting.category.createCategory.key,
    QUERY_PARAMS.jobsetting.category.createCategory.value,
  );
  const initialValues: CategorySchemaType = {
    category: "",
    industry: "",
    icon: "",
  };

  const formik = useFormik<CategorySchemaType>({
    initialValues,
    validationSchema: CategoryValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const formData = new FormData();
      formData.append("industry", values.industry);
      formData.append("category", values.category);
      if (values?.icon && values?.icon instanceof File)
        formData.append("icon", values.icon);
      const response = (await createCategory({
        url: endpoints.jobsetting.category.create,
        data: formData,
        invalidateTag: [apiTags.category.list],
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

  return { formik, isLoading, industries };
};

export default useCreateCategory;
