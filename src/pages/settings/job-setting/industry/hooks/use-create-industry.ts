import { usePostDataMutation } from "@/api/api";
import { useAddModal } from "@/hooks/use-add-modal";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import QUERY_PARAMS from "@/constant/query-params";
import {
  IndustrySchemaType,
  IndustryValidationSchema,
} from "../schema/industry-schema";

const useCreateIndustry = () => {
  const [createIndustry, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.jobsetting.industry.createIndustry.key,
    QUERY_PARAMS.jobsetting.industry.createIndustry.value,
  );
  const initialValues: IndustrySchemaType = {
    industry: "",
  };

  const formik = useFormik<IndustrySchemaType>({
    initialValues,
    validationSchema: IndustryValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await createIndustry({
        url: endpoints.jobsetting.industry.create,
        data: values,
        invalidateTag: [apiTags.industry.list],
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

  return { formik, isLoading };
};
export default useCreateIndustry;
