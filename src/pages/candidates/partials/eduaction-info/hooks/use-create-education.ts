import { usePostDataMutation } from "@/api/api";
import { ApiResponse } from "@/api/api.error";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { useFormik } from "formik";
import {
  EducationPayload,
  EducationSchemaType,
  EducationValidationSchema,
} from "../schema/education-info-schema";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useParams } from "react-router-dom";

const useCreateEducation = () => {
  const [
    createEducation,
    {
      isError: isEducationError,
      isLoading: isEducationLoading,
      isSuccess: isEducationSuccess,
    },
  ] = usePostDataMutation();

  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.education.createEducation.key,
    QUERY_PARAMS.education.createEducation.value,
  );

  const { id: paramJobSeekerId } = useParams();
  const localJobSeekerId = localStorage.getItem("jobSeekerId");

  const jobSeekerId = paramJobSeekerId || localJobSeekerId || "";

  const initialValues: EducationSchemaType = {
    level: "",
    instituteName: "",
    faculty: "",
    currentlyStudying: false,
    startDate: "",
    endDate: "",
  };

  const formik = useFormik<EducationSchemaType>({
    initialValues,
    validationSchema: EducationValidationSchema,

    onSubmit: async (values, { setErrors, resetForm }) => {
      if (!jobSeekerId) {
        setErrors({ level: "Please create personal details first." });
        return;
      }

      const payload: EducationPayload = {
        level: values.level,
        instituteName: values.instituteName,
        faculty: values.faculty,
        currentlyStudying: values.currentlyStudying,
        startDate: values.startDate,
        jobseeker: jobSeekerId,
      };

      if (values.endDate) {
        payload.endDate = values.endDate;
      }

      const response = (await createEducation({
        url: endpoints.candidates.education.create,
        data: payload,
        invalidateTag: [apiTags.candidates.education.list],
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
    isEducationError,
    isEducationLoading,
    isEducationSuccess,
  };
};

export default useCreateEducation;
