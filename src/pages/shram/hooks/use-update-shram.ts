import { useUpdateDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { apiTags } from "@/constant/tag";
import { endpoints } from "@/api/endpoints";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useShramDetails from "./use-shram-details";
import { ShramSchemaType, ShramValidationSchema } from "../schema/shram-schema";

const useUpdateShram = () => {
  const [updateShram, { isLoading }] = useUpdateDataMutation();
  const { handleCloseModal, updateId } = useUpdateModal();
  const { shramDetails, isLoading: isInitialLoading } = useShramDetails({
    id: updateId,
  });

  const initialValues: ShramSchemaType = {
    olsReferenceNo: shramDetails?.data?.olsReferenceNo || "",
    approvalDate: shramDetails?.data?.approvalDate || "",
    approvalFile: shramDetails?.data?.approvalFile || "",
    shramStatus: shramDetails?.data?.shramStatus || "",
  };

  const formik = useFormik<ShramSchemaType>({
    initialValues,
    validationSchema: ShramValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const formData = new FormData();
      formData.append("olsReferenceNo", values.olsReferenceNo);
      formData.append("approvalDate", values.approvalDate);
      formData.append("approvalFile", values.approvalFile);
      formData.append("shramStatus", values.shramStatus);
      const response = (await updateShram({
        data: formData,
        url: endpoints.shram.update.replace(":id", updateId ?? ""),
        invalidateTag: [apiTags.shram.details, apiTags.shram.list],
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

export default useUpdateShram;
