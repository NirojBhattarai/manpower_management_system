import { useUpdateDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { apiTags } from "@/constant/tag";
import { endpoints } from "@/api/endpoints";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useJobOfferDetails from "./use-job-offer-details";
import {
  JobOfferValidationSchema,
  updateJobOfferSchemaType,
} from "../schema/job-offer-schema";

const useUpdateJobOffer = () => {
  const [updateJobOffer, { isLoading }] = useUpdateDataMutation();
  const { handleCloseModal, updateId } = useUpdateModal();
  const { jobOfferDetails, isLoading: isInitialLoading } = useJobOfferDetails({
    id: updateId,
  });

  const initialValues: updateJobOfferSchemaType = {
    joiningDate: jobOfferDetails?.data?.joiningDate || "",
    offerDate: jobOfferDetails?.data?.offerDate || "",
    offerLetterNo: jobOfferDetails?.data?.offerLetterNo || "",
    offeredDocument: jobOfferDetails?.data?.offeredDocument || "",
    status: jobOfferDetails?.data?.status || "",
  };

  const formik = useFormik<updateJobOfferSchemaType>({
    initialValues,
    validationSchema: JobOfferValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const formData = new FormData();
      formData.append("joiningDate", values.joiningDate || "");
      formData.append("offerDate", values.offerDate || "");
      formData.append("offerLetterNo", values.offerLetterNo || "");
      formData.append("offeredDocument", values.offeredDocument || "");
      formData.append("status", values.status || "");
      const response = (await updateJobOffer({
        data: formData,
        url: endpoints.jobOffer.update.replace(":id", updateId ?? ""),
        invalidateTag: [
          apiTags.jobOffer.details,
          apiTags.jobOffer.list,
          apiTags.interviewSchedule.list,
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

export default useUpdateJobOffer;
