import { usePostDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { ApiResponse } from "@/api/api.error";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import {
  JobOfferSchemaType,
  JobOfferValidationSchema,
} from "@/pages/job-offer/schema/job-offer-schema";
import { IInterviewScheduleListItem } from "../interface/interview-schedule-interface";
import useMoveToJobOfferModal from "./use-move-to-job-offer-modal";

interface IMoveToJobOffer {
  candidates?: IInterviewScheduleListItem[];
}
const useMoveToJobOffer = ({ candidates }: IMoveToJobOffer) => {
  const [movetoJobOffer, { isLoading }] = usePostDataMutation();
  const { handleCloseMoveToJobOffer } = useMoveToJobOfferModal();
  const initialValues: JobOfferSchemaType = {
    offerDate: "",
    joiningDate: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: JobOfferValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      if (candidates?.length === 0) return;

      const payload = candidates?.map((item) => {
        return {
          ...values,
          jobseeker: item?.jobseeker?.id,
          jobVacancy: item?.jobVacancy?.id,
          jobTitle: item?.jobTitle?.id,
          company: item?.company?.id,
        };
      });
      const response = (await movetoJobOffer({
        data: payload,
        url: endpoints.jobOffer.create,
        invalidateTag: [
          apiTags.jobOffer.details,
          apiTags.jobOffer.list,
          apiTags.interviewSchedule.list,
          apiTags.candidates.appliedJob.list,
        ],
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          resetForm();
          handleCloseMoveToJobOffer();
        },
      });
    },
  });

  return { formik, isLoading };
};
export default useMoveToJobOffer;
