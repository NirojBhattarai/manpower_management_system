import { useFormik } from "formik";
import { usePostDataMutation } from "@/api/api";
import { apiTags } from "@/constant/tag";
import { endpoints } from "@/api/endpoints";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import {
  ChequeReceivedSchemaType,
  ChequeRecievedValidationSchema,
} from "../schema/cheque-received-schema";

const initialValues: ChequeReceivedSchemaType = {
  customerAccount: "",
  chequeDate: "",
  chequeNumber: "",
  amount: 0,
  receivedDate: "",
  status: "",
};

const useCreateRecievedCheque = () => {
  const [createReceivedCheque, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.chequeRegister.chequeReceived.createChequeReceived.key,
    QUERY_PARAMS.chequeRegister.chequeReceived.createChequeReceived.value,
  );

  const formik = useFormik<ChequeReceivedSchemaType>({
    initialValues,
    validationSchema: ChequeRecievedValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await createReceivedCheque({
        url: endpoints.chequeReceived.create,
        data: values,
        invalidateTag: [apiTags.chequeRegister.chequeReceived.list],
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
  };
};

export default useCreateRecievedCheque;
