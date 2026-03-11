import { useUpdateDataMutation } from "@/api/api";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useBankDetails from "./use-bank-details";
import {
  BankSchemaType,
  BankValidationSchema,
} from "../schema/bank-setting-schema";

const useUpdateBank = () => {
  const { updateId, handleCloseModal } = useUpdateModal();
  const [updateBank, { isLoading }] = useUpdateDataMutation();
  const { bankDetails, isLoading: isInitialLoading } = useBankDetails({
    id: updateId ?? "",
  });
  const initialValues: BankSchemaType = {
    bankName: bankDetails?.data?.bankName || "",
    accountNumber: bankDetails?.data?.accountNumber || "",
  };

  const formik = useFormik<BankSchemaType>({
    initialValues,
    validationSchema: BankValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updateBank({
        data: values,
        url: endpoints.bank.update.replace(":id", updateId ?? ""),
        invalidateTag: [apiTags.bank.list, apiTags.bank.details],
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
export default useUpdateBank;
