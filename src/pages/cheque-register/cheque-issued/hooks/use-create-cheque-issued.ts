import { useFormik } from "formik";
import { usePostDataMutation } from "@/api/api";
import { apiTags } from "@/constant/tag";
import { endpoints } from "@/api/endpoints";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import {
  ChequeIssuedSchemaType,
  ChequeIssuedValidationSchema,
} from "../schema/cheque-issued-schema";

const initialValues: ChequeIssuedSchemaType = {
  supplierAccount: "",
  payeeName: "",
  bankAccount: "",
  chequeNumber: "",
  chequeDate: "",
  issuedDate: "",
  amount: 0,
  status: "",
};

const useCreateIssuedCheque = () => {
  const [createIssuedCheque, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.chequeRegister.chequeIssued.createChequeIssued.key,
    QUERY_PARAMS.chequeRegister.chequeIssued.createChequeIssued.value,
  );

  const formik = useFormik<ChequeIssuedSchemaType>({
    initialValues,
    validationSchema: ChequeIssuedValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await createIssuedCheque({
        url: endpoints.chequeIssued.create,
        data: values,
        invalidateTag: [apiTags.chequeRegister.chequeIssued.list],
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

export default useCreateIssuedCheque;
