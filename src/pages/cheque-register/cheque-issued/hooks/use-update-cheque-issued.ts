import { useUpdateDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { apiTags } from "@/constant/tag";
import { endpoints } from "@/api/endpoints";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useIssuedChequeDetails from "./use-cheque-issued-details";
import {
  ChequeIssuedSchemaType,
  ChequeIssuedValidationSchema,
} from "../schema/cheque-issued-schema";

const useUpdateChequeIssued = () => {
  const [updateChequeIssued, { isLoading }] = useUpdateDataMutation();
  const { handleCloseModal, updateId } = useUpdateModal("cheque-issued-id");
  const { issuedChequeDetails, isLoading: isInitialLoading } =
    useIssuedChequeDetails({
      id: updateId,
    });

  const initialValues: ChequeIssuedSchemaType = {
    supplierAccount: issuedChequeDetails?.data?.supplierAccount?.id || "",
    payeeName: issuedChequeDetails?.data?.payeeName || "",
    bankAccount: issuedChequeDetails?.data?.bankAccount?.id || "",
    chequeDate: issuedChequeDetails?.data?.chequeDate || "",
    chequeNumber: issuedChequeDetails?.data?.chequeNumber || "",
    amount: issuedChequeDetails?.data?.amount || 0,
    issuedDate: issuedChequeDetails?.data?.issuedDate || "",
    status: issuedChequeDetails?.data?.status || "",
  };

  const formik = useFormik<ChequeIssuedSchemaType>({
    initialValues,
    validationSchema: ChequeIssuedValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updateChequeIssued({
        data: values,
        url: endpoints.chequeIssued.update.replace(":id", updateId ?? ""),
        invalidateTag: [
          apiTags.chequeRegister.chequeIssued.details,
          apiTags.chequeRegister.chequeIssued.list,
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

export default useUpdateChequeIssued;
