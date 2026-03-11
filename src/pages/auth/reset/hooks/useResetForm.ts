import { useFormik } from "formik";
import { resetFormSchema, ResetFormValues } from "../schema/resetFormSchema";
import { usePostDataMutation } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constant/path";

export const useResetForm = () => {
  const [resetPassword, { isLoading, isError, isSuccess }] =
    usePostDataMutation();
  const navigate = useNavigate();

  const initialValues: ResetFormValues = {
    email: "",
  };
  const formik = useFormik<ResetFormValues>({
    initialValues,
    validationSchema: resetFormSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await resetPassword({
        url: endpoints.forgotPassword,
        data: values,
        invalidateTag: [],
      })) as ApiResponse;

      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          resetForm();
          navigate(`${PATH.auth.forgotPassword}?email=${values.email}`);
        },
      });
    },
  });
  return { formik, isLoading, isError, isSuccess };
};
