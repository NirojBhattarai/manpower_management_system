import { useUpdateDataMutation } from "@/api/api";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useExperienceDetails from "./use-experience-details";
import {
  ExperiencePayload,
  ExperienceSchemaType,
  ExperienceValidationSchema,
} from "../schema/expereince-info-schema";

const useUpdateExperience = () => {
  const { updateId, handleCloseModal, jobSeekerId } = useUpdateModal();
  const [updateExperience, { isLoading }] = useUpdateDataMutation();
  const { experienceDetails, isLoading: isInitialLoading } =
    useExperienceDetails({
      id: updateId ?? "",
      jobSeekerId: jobSeekerId ?? "",
    });
  const initialValues: ExperienceSchemaType = {
    title: experienceDetails?.data?.title || "",
    companyName: experienceDetails?.data?.companyName || "",
    startDate: experienceDetails?.data?.startDate || "",
    endDate: experienceDetails?.data?.endDate || "",
    level: experienceDetails?.data?.level || "",
    currentlyWorking: experienceDetails?.data?.currentlyWorking || false,
    description: experienceDetails?.data?.description || "",
  };

  const formik = useFormik<ExperienceSchemaType>({
    initialValues,
    validationSchema: ExperienceValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const payload: ExperiencePayload = {
        title: values.title,
        companyName: values.companyName,
        startDate: values.startDate,
        level: values.level,
        currentlyWorking: values.currentlyWorking,
        description: values.description,
      };

      if (values.endDate) {
        payload.endDate = values.endDate;
      }
      const response = (await updateExperience({
        data: payload,
        url: endpoints.candidates.experience.update
          .replace(":id", updateId ?? "")
          .replace(":jobSeekerId", jobSeekerId ?? ""),
        invalidateTag: [
          apiTags.candidates.experience.list,
          apiTags.candidates.experience.details,
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
export default useUpdateExperience;
