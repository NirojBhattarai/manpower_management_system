import { usePostDataMutation } from "@/api/api";
import { ApiResponse } from "@/api/api.error";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { useFormik } from "formik";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import {
  ExperiencePayload,
  ExperienceSchemaType,
  ExperienceValidationSchema,
} from "../schema/expereince-info-schema";
import { useParams } from "react-router-dom";

const useCreateExperience = () => {
  const [
    createExperience,
    {
      isError: isExperienceError,
      isLoading: isExperienceLoading,
      isSuccess: isExperienceSuccess,
    },
  ] = usePostDataMutation();

  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.experience.createExperience.key,
    QUERY_PARAMS.experience.createExperience.value,
  );

  const { id: paramJobSeekerId } = useParams();
  const localJobSeekerId = localStorage.getItem("jobSeekerId");

  const jobSeekerId = paramJobSeekerId || localJobSeekerId || "";

  const initialValues: ExperienceSchemaType = {
    title: "",
    companyName: "",
    startDate: "",
    endDate: "",
    level: "",
    currentlyWorking: false,
    description: "",
  };

  const formik = useFormik<ExperienceSchemaType>({
    initialValues,
    validationSchema: ExperienceValidationSchema,

    onSubmit: async (values, { setErrors, resetForm }) => {
      if (!jobSeekerId) {
        setErrors({ level: "Please create personal details first." });
        return;
      }

      const payload: ExperiencePayload = {
        title: values.title,
        companyName: values.companyName,
        startDate: values.startDate,
        level: values.level,
        currentlyWorking: values.currentlyWorking,
        description: values.description,
        jobseeker: jobSeekerId,
      };

      if (values.endDate) {
        payload.endDate = values.endDate;
      }

      const response = (await createExperience({
        url: endpoints.candidates.experience.create,
        data: payload,
        invalidateTag: [apiTags.candidates.experience.list],
      })) as ApiResponse;

      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          handleCloseModal();
          resetForm();
        },
      });
    },
  });

  return {
    formik,
    isExperienceError,
    isExperienceLoading,
    isExperienceSuccess,
  };
};

export default useCreateExperience;
