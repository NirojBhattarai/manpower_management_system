import { useUpdateDataMutation } from "@/api/api";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useEducationDetails from "./use-education-details";
import {
  EducationPayload,
  EducationSchemaType,
  EducationValidationSchema,
} from "../schema/education-info-schema";

const useUpdateEducation = () => {
  const { updateId, handleCloseModal, jobSeekerId } = useUpdateModal();
  const [updateEducation, { isLoading }] = useUpdateDataMutation();
  const { educationDetails, isLoading: isInitialLoading } = useEducationDetails(
    {
      id: updateId ?? "",
      jobSeekerId: jobSeekerId ?? "",
    },
  );
  const initialValues: EducationSchemaType = {
    level: educationDetails?.data?.level || "",
    instituteName: educationDetails?.data?.instituteName || "",
    faculty: educationDetails?.data?.faculty || "",
    currentlyStudying: educationDetails?.data?.currentlyStudying || false,
    startDate: educationDetails?.data?.startDate || "",
    endDate: educationDetails?.data?.endDate || "",
  };

  const formik = useFormik<EducationSchemaType>({
    initialValues,
    validationSchema: EducationValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const payload: EducationPayload = {
        level: values.level,
        instituteName: values.instituteName,
        faculty: values.faculty,
        currentlyStudying: values.currentlyStudying,
        startDate: values.startDate,
      };

      if (values.endDate) {
        payload.endDate = values.endDate;
      }
      const response = (await updateEducation({
        data: payload,
        url: endpoints.candidates.education.update
          .replace(":id", updateId ?? "")
          .replace(":jobSeekerId", jobSeekerId ?? ""),
        invalidateTag: [
          apiTags.candidates.education.list,
          apiTags.candidates.education.details,
        ],
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
export default useUpdateEducation;
