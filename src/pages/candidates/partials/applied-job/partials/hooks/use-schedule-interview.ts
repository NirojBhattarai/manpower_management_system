import { usePostDataMutation } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { useFormik } from "formik";
import QUERY_PARAMS from "@/constant/query-params";
import { useParams, useSearchParams } from "react-router-dom";
import {
  InterviewScheduleSchemaType,
  InterviewScheduleValidationSchema,
} from "../schema/interview-schedule-schema";
import useApppliedJobDetails from "../../hooks/use-applied-job-details";
import useQueryParams from "@/hooks/use-query-params";
import { useMemo } from "react";
import { showErrorMessage } from "@/utils/toast";

const useScheduleInterview = () => {
  const { deleteQueryParams } = useQueryParams();
  const [
    scheduleInterview,
    {
      isError: isSchdeuleInterviewError,
      isLoading: isScheduleInterviewLoading,
      isSuccess: isScheduleInterviewSuccess,
    },
  ] = usePostDataMutation();

  const handleCloseModal = () => {
    deleteQueryParams([
      QUERY_PARAMS.interviewSchedule.createInterviewSchedule.key,
    ]);
  };

  const [searchParams] = useSearchParams();

  const interviewScheduleId = searchParams.get("create-interview-schedule-id");

  const { id: paramJobSeekerId } = useParams();
  const localJobSeekerId = localStorage.getItem("jobSeekerId");

  const jobSeekerId = paramJobSeekerId || localJobSeekerId || "";

  const { appliedJobDetails, isLoading: isInitialLoading } =
    useApppliedJobDetails({
      id: interviewScheduleId ?? "",
      jobSeekerId: jobSeekerId ?? "",
    });

  const initialValues: InterviewScheduleSchemaType = useMemo(
    () => ({
      jobseeker: jobSeekerId ?? "",
      company: appliedJobDetails?.data?.company?.id ?? "",
      jobVacancy: appliedJobDetails?.data?.jobvacancy?.id ?? "",
      jobTitle: appliedJobDetails?.data?.jobvacancy?.jobTitle?.id ?? "",
      interviewDate: "",
      interviewMode: "onsite",
      interviewLocation: "",
      interviewerName: "",
      interviewStatus: "scheduled",
    }),
    [appliedJobDetails, jobSeekerId],
  );

  const formik = useFormik<InterviewScheduleSchemaType>({
    initialValues,
    validationSchema: InterviewScheduleValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        const response = await scheduleInterview({
          url: endpoints.interviewSchedule.create,
          data: values,
          invalidateTag: [
            apiTags.interviewSchedule.list,
            apiTags.candidates.appliedJob.list,
          ],
        }).unwrap();
        handleResponse({
          response,
          setErrorCallBack: setErrors,
          handleOnSuccess: () => {
            handleCloseModal();
            resetForm();
          },
        });
      } catch (error: any) {
        const backendErrors = error?.data?.errors;

        if (Array.isArray(backendErrors) && backendErrors.length > 0) {
          backendErrors.forEach((err: any) => {
            showErrorMessage(err.msg);
          });
        } else {
          showErrorMessage(error?.data?.message || "Something went wrong");
        }
      }
    },
  });

  return {
    formik,
    isSchdeuleInterviewError,
    isScheduleInterviewLoading,
    isScheduleInterviewSuccess,
    isInitialLoading,
  };
};

export default useScheduleInterview;
