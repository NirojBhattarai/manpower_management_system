import { useUpdateDataMutation } from "@/api/api";
import { useUpdateModal } from "@/hooks/use-update-modal";
import {
  UpdateInsuranceSchemaType,
  UpdateInsuranceValidationSchema,
} from "../schema/insurance-schema";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { ApiResponse } from "@/api/api.error";
import useInsuranceDetails from "./use-insurance-details";

const useInsuranceUpdate = () => {
  const [updateInsurance, { isLoading }] = useUpdateDataMutation();
  const { handleCloseModal, updateId } = useUpdateModal();
  const { insuranceDetails, isLoading: isInitialLoading } = useInsuranceDetails(
    {
      id: updateId,
    },
  );

  const initialValues: UpdateInsuranceSchemaType = {
    insuranceCompany: insuranceDetails?.data?.insuranceCompany?.id || "",
    policyNumber: insuranceDetails?.data?.policyNumber || "",
    validFrom: insuranceDetails?.data?.validFrom || "",
    validTo: insuranceDetails?.data?.validTo || "",
    insuranceDocument: insuranceDetails?.data?.insuranceDocument || "",
    insuranceStatus: insuranceDetails?.data?.insuranceStatus || "",
  };

  const formik = useFormik<UpdateInsuranceSchemaType>({
    initialValues,
    validationSchema: UpdateInsuranceValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const formData = new FormData();
      formData.append("insuranceCompany", values.insuranceCompany);
      formData.append("policyNumber", values.policyNumber);
      formData.append("validFrom", values.validFrom);
      formData.append("validTo", values.validTo);
      formData.append("insuranceDocument", values.insuranceDocument);
      formData.append("insuranceStatus", values.insuranceStatus);
      const response = (await updateInsurance({
        data: formData,
        url: endpoints.insurance.update.replace(":id", updateId ?? ""),
        invalidateTag: [apiTags.insurance.details, apiTags.insurance.list],
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

export default useInsuranceUpdate;
