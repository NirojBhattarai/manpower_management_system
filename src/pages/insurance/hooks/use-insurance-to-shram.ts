import { usePostDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { ApiResponse } from "@/api/api.error";
import { IInsuranceListItem } from "../interface/insurance-interface";
import useInsuranceToShramModal from "./use-insurance-to-shram-modal";

interface IMoveToShram {
  candidates?: IInsuranceListItem[];
}
const useInsuranceToShram = ({ candidates }: IMoveToShram) => {
  const [moveToShram, { isLoading }] = usePostDataMutation();
  const { handleCloseInsuranceToShram } = useInsuranceToShramModal();

  const initialValues = {
    jobseeker: "",
    jobVacancy: "",
    jobTitle: "",
    company: "",
  };

  const formik = useFormik({
    initialValues,
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
      const response = (await moveToShram({
        data: payload,
        url: endpoints.shram.create,
        invalidateTag: [
          apiTags.shram.details,
          apiTags.shram.list,
          apiTags.insurance.list,
        ],
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          resetForm();
          handleCloseInsuranceToShram();
        },
      });
    },
  });

  return { formik, isLoading };
};

export default useInsuranceToShram;
