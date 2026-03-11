import { usePostDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { IJobOfferListItem } from "../interface/job-offer-interface";
import useJobOfferToMedicalModal from "./use-job-offer-to-medical-modal";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { ApiResponse } from "@/api/api.error";
import {
  MedicalSchemaType,
  MedicalValidationSchema,
} from "@/pages/medical/schema/medical-schema";

interface IMoveToMedical {
  candidates?: IJobOfferListItem[];
}
const useJobOfferToMedical = ({ candidates }: IMoveToMedical) => {
  const [moveToMedical, { isLoading }] = usePostDataMutation();
  const { handleCloseJobOfferToMedical } = useJobOfferToMedicalModal();
  const initialValues: MedicalSchemaType = {
    hospital: "",
    examDate: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: MedicalValidationSchema,
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
      const response = (await moveToMedical({
        data: payload,
        url: endpoints.medical.create,
        invalidateTag: [
          apiTags.medical.details,
          apiTags.medical.list,
          apiTags.jobOffer.list,
          apiTags.candidates.appliedJob.list,
        ],
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          resetForm();
          handleCloseJobOfferToMedical();
        },
      });
    },
  });

  return { formik, isLoading };
};

export default useJobOfferToMedical;
