import { useUpdateDataMutation } from "@/api/api";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import {
  InsuranceCompanySchemaType,
  InsuranceCompanyValidationSchema,
} from "../schema/insurance-company-schema";
import useInsuranceCompanyDetails from "./use-insurance-company-details";

const useUpdateInsuranceCompany = () => {
  const { updateId, handleCloseModal } = useUpdateModal();
  const [updateInsuranceCompany, { isLoading }] = useUpdateDataMutation();
  const { insuranceCompanyDetails, isLoading: isInitialLoading } =
    useInsuranceCompanyDetails({
      id: updateId ?? "",
    });
  const initialValues: InsuranceCompanySchemaType = {
    name: insuranceCompanyDetails?.data?.name || "",
    address: insuranceCompanyDetails?.data?.address || "",
    email: insuranceCompanyDetails?.data?.email || "",
    phone: insuranceCompanyDetails?.data?.phone || "",
  };

  const formik = useFormik<InsuranceCompanySchemaType>({
    initialValues,
    validationSchema: InsuranceCompanyValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updateInsuranceCompany({
        data: values,
        url: endpoints.insuranceCompany.update.replace(":id", updateId ?? ""),
        invalidateTag: [
          apiTags.insuranceCompany.list,
          apiTags.insuranceCompany.details,
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
export default useUpdateInsuranceCompany;
