import { useUpdateDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { apiTags } from "@/constant/tag";
import { endpoints } from "@/api/endpoints";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useReceivedChequeDetails from "./use-cheque-received-details";
import {
  ChequeReceivedSchemaType,
  ChequeRecievedValidationSchema,
} from "../schema/cheque-received-schema";

const useUpdateChequeReceived = () => {
  const [updateChequeReceived, { isLoading }] = useUpdateDataMutation();
  const { handleCloseModal, updateId } = useUpdateModal("cheque-received-id");
  const { receivedChequeDetails, isLoading: isInitialLoading } =
    useReceivedChequeDetails({
      id: updateId,
    });

  const initialValues: ChequeReceivedSchemaType = {
    customerAccount: receivedChequeDetails?.data?.customerAccount?.id || "",
    chequeDate: receivedChequeDetails?.data?.chequeDate || "",
    chequeNumber: receivedChequeDetails?.data?.chequeNumber || "",
    amount: receivedChequeDetails?.data?.amount || 0,
    receivedDate: receivedChequeDetails?.data?.receivedDate || "",
    status: receivedChequeDetails?.data?.status || "",
  };

  const formik = useFormik<ChequeReceivedSchemaType>({
    initialValues,
    validationSchema: ChequeRecievedValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updateChequeReceived({
        data: values,
        url: endpoints.chequeReceived.update.replace(":id", updateId ?? ""),
        invalidateTag: [
          apiTags.chequeRegister.chequeReceived.details,
          apiTags.chequeRegister.chequeReceived.list,
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

export default useUpdateChequeReceived;
