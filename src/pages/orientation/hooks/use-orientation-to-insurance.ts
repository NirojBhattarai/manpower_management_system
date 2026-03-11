import { usePostDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { ApiResponse } from "@/api/api.error";
import { IOrientationListItem } from "../interface/orientation-interface";
import useOrientationToInsuranceModal from "./use-orientation-to-insurance-modal";
import {
  InsuranceSchemaType,
  InsuranceValidationSchema,
} from "@/pages/insurance/schema/insurance-schema";

interface IMoveToInsurance {
  candidates?: IOrientationListItem[];
}
const useOrientationToInsurance = ({ candidates }: IMoveToInsurance) => {
  const [moveToInsurance, { isLoading }] = usePostDataMutation();
  const { handleCloseOrientationToInsurance } =
    useOrientationToInsuranceModal();

  const initialValues: InsuranceSchemaType = {
    insuranceCompany: "",
  };

  const formik = useFormik<InsuranceSchemaType>({
    initialValues,
    validationSchema: InsuranceValidationSchema,
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
      const response = (await moveToInsurance({
        data: payload,
        url: endpoints.insurance.create,
        invalidateTag: [
          apiTags.insurance.details,
          apiTags.insurance.list,
          apiTags.orientation.list,
          apiTags.candidates.appliedJob.list,
        ],
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          resetForm();
          handleCloseOrientationToInsurance();
        },
      });
    },
  });

  return { formik, isLoading };
};

export default useOrientationToInsurance;
