import { usePostDataMutation } from "@/api/api";
import { useAddModal } from "@/hooks/use-add-modal";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import QUERY_PARAMS from "@/constant/query-params";
import {
  InsuranceCompanySchemaType,
  InsuranceCompanyValidationSchema,
} from "../schema/insurance-company-schema";

const useCreateInsuranceCompany = () => {
  const [createInsuranceCompany, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.setting.insuranceComapany.createInsuranceComapany.key,
    QUERY_PARAMS.setting.insuranceComapany.createInsuranceComapany.value,
  );
  const initialValues: InsuranceCompanySchemaType = {
    name: "",
    address: "",
    email: "",
    phone: "",
  };

  const formik = useFormik<InsuranceCompanySchemaType>({
    initialValues,
    validationSchema: InsuranceCompanyValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await createInsuranceCompany({
        url: endpoints.insuranceCompany.create,
        data: values,
        invalidateTag: [apiTags.insuranceCompany.list],
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

  return { formik, isLoading };
};
export default useCreateInsuranceCompany;
