import { usePostDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { ApiResponse } from "@/api/api.error";
import { IMedicalListItem } from "../interface/medical-interface";
import useMedicalToVisaModal from "./use-medical-to-visa-modal";
import {
  VisaSchemaType,
  VisaValidationSchema,
} from "@/pages/visa/schema/visa-schema";

interface IMoveToVisa {
  candidates?: IMedicalListItem[];
}
const useMedicalToVisa = ({ candidates }: IMoveToVisa) => {
  const [moveToVisa, { isLoading }] = usePostDataMutation();
  const { handleCloseMedicalToVisa } = useMedicalToVisaModal();

  const initialValues: VisaSchemaType = {
    applicationDate: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: VisaValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      if (candidates?.length === 0) return;

      const payload = candidates?.map((item) => {
        return {
          ...values,
          visaType: "Work Visa",
          jobseeker: item?.jobseeker?.id,
          jobVacancy: item?.jobVacancy?.id,
          jobTitle: item?.jobTitle?.id,
          company: item?.company?.id,
        };
      });
      const response = (await moveToVisa({
        data: payload,
        url: endpoints.visa.create,
        invalidateTag: [
          apiTags.visa.details,
          apiTags.visa.list,
          apiTags.medical.list,
          apiTags.candidates.appliedJob.list,
        ],
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          resetForm();
          handleCloseMedicalToVisa();
        },
      });
    },
  });

  return { formik, isLoading };
};

export default useMedicalToVisa;
