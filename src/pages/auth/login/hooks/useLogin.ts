import { usePostDataMutation } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { showErrorMessage, showSuccessMessage } from "@/utils/toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ILoginError, ILoginSuccess } from "../interface/ILogin";
import { PATH } from "@/constant/path";
import handleErrors, { ApiResponse } from "@/api/api.error";
import { COOKIE_CONFIG, setCookie } from "@/utils/cookie";

const useLogin = () => {
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess, isError }] = usePostDataMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(4, "Password must be at least 6 characters"),
      //  .matches(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
      //  .matches(/(?=.*\d)/, "Password must contain at least one number")
      //  .matches(/(?=.*[!@#$%^&*()_+={}\[\]:;"\'<>,.?/\\|`~])/, "Password must contain at least one special character"),
    }),
    onSubmit: async (values) => {
      const res = await login({
        url: endpoints.login,
        data: values,
      });
      const response: ILoginSuccess = res?.data;
      const error = res?.error as ILoginError;
      if ("error" in response && response.error) {
        handleErrors(res as ApiResponse, (errors) => {
          if (errors.general) {
            showErrorMessage(errors.general);
          } else {
            Object.entries(errors).forEach(([field, msg]) => {
              showErrorMessage(`${field}: ${msg}`);
            });
          }
        });
        return;
      }
      if (response && response?.status === "success") {
        setCookie({
          cookieName: COOKIE_CONFIG.tenantId,
          value: response?.data?.user?.tenantId,
        });
        showSuccessMessage(response?.message);
        navigate(PATH.dashboard.dashboard, { replace: true });
      } else if (error) {
        showErrorMessage(error?.data?.message);
      }
    },
  });

  return { formik, isLoading, isSuccess, isError };
};

export default useLogin;
