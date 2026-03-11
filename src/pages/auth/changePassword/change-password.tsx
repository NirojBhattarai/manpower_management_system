import ExtendedForm from "@/components/extended-components/ExtendedForm";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import useChangePassword from "./hooks/use-change-password";
import ChangePasswordForm from "./partials/change-password-form";
import { PATH } from "@/constant/path";

const ChangePassword = () => {
  const { formik, isLoading } = useChangePassword();
  return (
    <div className="flex justify-center items-center px-4 min-h-screen">
      <div className="bg-white p-8 rounded w-full max-w-2xl">
        <ExtendedForm
          formik={formik}
          submitText="Change Password"
          isSubmitting={isLoading}
        >
          <ChangePasswordForm />
        </ExtendedForm>
        <div className="mt-4 text-center">
          <Link
            to={PATH.dashboard.dashboard}
            className="font-semibold text-primary-500 hover:text-primary-600"
          >
            <FaArrowLeft className="inline-block mr-2" />
            Go back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
