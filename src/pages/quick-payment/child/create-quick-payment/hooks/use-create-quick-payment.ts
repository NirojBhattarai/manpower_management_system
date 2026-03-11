import { usePostDataMutation } from "@/api/api";
import { ApiResponse } from "@/api/api.error";
import { endpoints } from "@/api/endpoints";
import { PATH } from "@/constant/path";
import { apiTags } from "@/constant/tag";
import {
  QuickPaymentSchema,
  quickPaymentValidationSchema,
} from "@/pages/quick-payment/schema/quick-payment-schema";
import { handleResponse } from "@/utils/handleResponse";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const useCreateQuickPayment = () => {
  const [createQuickPayment, { isLoading }] = usePostDataMutation();
  const navigate = useNavigate();
  const initialValues: QuickPaymentSchema = {
    paidFrom: "",
    date: "",
    reference: "",
    payments: [],
    temp_payment: {
      account: "",
      amount: "",
      description: "",
    },
    edit_index: null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: quickPaymentValidationSchema,
    onSubmit: async (values, { setErrors }) => {
      const response = (await createQuickPayment({
        url: endpoints.quickPayment.create,
        data: values,
        invalidateTag: [apiTags.quickPayment.list],
      })) as ApiResponse;
      handleResponse({
        response,
        handleOnSuccess: () => {
          navigate(PATH.quickPayment.index);
        },
        setErrorCallBack: setErrors,
      });
    },
  });

  return { formik, isLoading };
};

export default useCreateQuickPayment;
