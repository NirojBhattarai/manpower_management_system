import { useFormik } from "formik";
import {
  NewPasswordFormValues,
  newPasswordValidationSchema,
} from "../schema/newPasswordValidation";
import { usePostDataMutation } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import { useSearchParams } from "react-router-dom";

const useCreateNewPassword = () => {
  const [createNewPasswordForm, { isError, isLoading, isSuccess }] =
    usePostDataMutation();
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");
  const initialValues: NewPasswordFormValues = {
    newPassword: "",
    confirmPassword: "",
    otpCode: "",
  };
  const formik = useFormik<NewPasswordFormValues>({
    initialValues,
    validationSchema: newPasswordValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const payload = {
        email: email,
        otpCode: values.otpCode,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };
      const response = (await createNewPasswordForm({
        url: endpoints.resetPassword,
        data: payload,
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          resetForm();
        },
      });
    },
  });
  return { formik, isError, isLoading, isSuccess };
};

export default useCreateNewPassword;
