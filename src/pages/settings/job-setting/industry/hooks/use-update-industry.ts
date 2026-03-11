import { useUpdateDataMutation } from "@/api/api";
import { useFormik } from "formik";
import {
  IndustrySchemaType,
  IndustryValidationSchema,
} from "../schema/industry-schema";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import useIndustryDetails from "./use-industry-details";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";

const useUpdateIndustry = () => {
  const { updateId, handleCloseModal } = useUpdateModal();
  const [updateIndustry, { isLoading }] = useUpdateDataMutation();
  const { industryDetails, isLoading: isInitialLoading } = useIndustryDetails({
    id: updateId ?? "",
  });
  const initialValues: IndustrySchemaType = {
    industry: industryDetails?.data?.industry || "",
  };

  const formik = useFormik<IndustrySchemaType>({
    initialValues,
    validationSchema: IndustryValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updateIndustry({
        data: values,
        url: endpoints.jobsetting.industry.update.replace(
          ":id",
          updateId ?? "",
        ),
        invalidateTag: [apiTags.industry.list, apiTags.industry.details],
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

  return { formik, isLoading, isInitialLoading };
};

export default useUpdateIndustry;
