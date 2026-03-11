import { useUpdateDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { apiTags } from "@/constant/tag";
import { endpoints } from "@/api/endpoints";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useVisaDetails from "./use-visa-details";
import {
  UpdateVisaSchemaType,
  UpdateVisaValidationSchema,
} from "../schema/visa-schema";

const useUpdateVisa = () => {
  const [updateVisa, { isLoading }] = useUpdateDataMutation();
  const { handleCloseModal, updateId } = useUpdateModal();
  const { visaDetails, isLoading: isInitialLoading } = useVisaDetails({
    id: updateId,
  });

  const initialValues: UpdateVisaSchemaType = {
    applicationDate: visaDetails?.data?.applicationDate || "",
    approvalDate: visaDetails?.data?.approvalDate || "",
    visaExpireDate: visaDetails?.data?.visaExpireDate || "",
    visaStatus: visaDetails?.data?.visaStatus || "",
    visaFile: visaDetails?.data?.visaFile || "",
  };

  const formik = useFormik<UpdateVisaSchemaType>({
    initialValues,
    validationSchema: UpdateVisaValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const formData = new FormData();
      formData.append("applicationDate", values.applicationDate || "");
      formData.append("approvalDate", values.approvalDate || "");
      formData.append("visaExpireDate", values.visaExpireDate || "");
      formData.append("visaStatus", values.visaStatus || "");
      formData.append("visaFile", values.visaFile || "");
      const response = (await updateVisa({
        data: formData,
        url: endpoints.visa.update.replace(":id", updateId ?? ""),
        invalidateTag: [apiTags.visa.details, apiTags.visa.list],
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          handleCloseModal();
          resetForm();
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

export default useUpdateVisa;
