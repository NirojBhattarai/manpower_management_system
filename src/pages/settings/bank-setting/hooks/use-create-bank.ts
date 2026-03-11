import { usePostDataMutation } from "@/api/api";
import { useAddModal } from "@/hooks/use-add-modal";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import QUERY_PARAMS from "@/constant/query-params";
import {
  BankSchemaType,
  BankValidationSchema,
} from "../schema/bank-setting-schema";

const useCreateBank = () => {
  const [createBank, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.setting.bankSetting.createBank.key,
    QUERY_PARAMS.setting.bankSetting.createBank.value,
  );
  const initialValues: BankSchemaType = {
    bankName: "",
    accountNumber: "",
  };

  const formik = useFormik<BankSchemaType>({
    initialValues,
    validationSchema: BankValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await createBank({
        url: endpoints.bank.create,
        data: values,
        invalidateTag: [apiTags.bank.list],
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

export default useCreateBank;
