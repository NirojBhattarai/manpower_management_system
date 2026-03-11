import { useFormik } from "formik";
import { usePostDataMutation } from "@/api/api";
import {
  ChangePasswordFormValues,
  ChangePasswordValidationSchema,
} from "../schema/change-password-schema";
import { endpoints } from "@/api/endpoints";
import { handleResponse } from "@/utils/handleResponse";
import { ApiResponse } from "@/api/api.error";

const useChangePassword = () => {
  const [changePassword, { isError, isLoading, isSuccess }] =
    usePostDataMutation();

  const initialValues: ChangePasswordFormValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const formik = useFormik<ChangePasswordFormValues>({
    initialValues,
    validationSchema: ChangePasswordValidationSchema,

    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await changePassword({
        url: endpoints.changePassword,
        data: values,
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

export default useChangePassword;
