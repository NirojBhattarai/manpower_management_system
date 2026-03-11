import { useUpdateDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { apiTags } from "@/constant/tag";
import { endpoints } from "@/api/endpoints";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useInterviewDetails from "./use-interview-details";
import {
  InterviewScheduleSchemaType,
  InterviewScheduleValidationSchema,
} from "@/pages/candidates/partials/applied-job/partials/schema/interview-schedule-schema";

const useUpdateInterview = () => {
  const [updateCountry, { isLoading }] = useUpdateDataMutation();
  const { handleCloseModal, updateId } = useUpdateModal();
  const { interviewDetails, isLoading: isInitialLoading } = useInterviewDetails(
    {
      id: updateId,
    },
  );

  const initialValues: InterviewScheduleSchemaType = {
    jobseeker: interviewDetails?.data?.jobseeker?.id || "",
    jobVacancy: interviewDetails?.data?.jobVacancy?.id || "",
    jobTitle: interviewDetails?.data?.jobTitle?.id || "",
    interviewDate: interviewDetails?.data?.interviewDate || "",
    interviewMode: interviewDetails?.data?.interviewMode || "online",
    interviewLocation: interviewDetails?.data?.interviewLocation || "",
    interviewerName: interviewDetails?.data?.interviewerName || "",
    interviewStatus: interviewDetails?.data?.interviewStatus,
    company: interviewDetails?.data?.company?.id || "",
    remarks: interviewDetails?.data?.remarks || "",
    interviewResult: interviewDetails?.data?.interviewResult || "",
  };

  const formik = useFormik<InterviewScheduleSchemaType>({
    initialValues,
    validationSchema: InterviewScheduleValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updateCountry({
        data: values,
        url: endpoints.interviewSchedule.update.replace(":id", updateId ?? ""),
        invalidateTag: [
          apiTags.interviewSchedule.details,
          apiTags.interviewSchedule.list,
          apiTags.candidates.appliedJob.list,
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

  return {
    formik,
    isLoading,
    isInitialLoading,
  };
};

export default useUpdateInterview;
