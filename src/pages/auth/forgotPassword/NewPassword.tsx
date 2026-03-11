import ExtendedForm from "@/components/extended-components/ExtendedForm";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import SetNewPasswordForm from "./partials/ResetPasswordForm";
import useCreateNewPassword from "./hooks/useCreateNewPasswordForm";

const ForgotPassword = () => {
  const { formik, isLoading } = useCreateNewPassword();
  return (
    <div className="flex justify-center items-center px-4 min-h-screen">
      <div className="bg-white p-8 rounded w-full max-w-2xl">
        <ExtendedForm
          formik={formik}
          submitText="Reset Password"
          isSubmitting={isLoading}
        >
          <SetNewPasswordForm />
        </ExtendedForm>
        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="font-semibold text-primary-500 hover:text-primary-600"
          >
            <FaArrowLeft className="inline-block mr-2" />
            Go back to Login Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
