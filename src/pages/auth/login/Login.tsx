import ExtendedForm from "@/components/extended-components/ExtendedForm";
import { Link } from "react-router-dom";
import useLogin from "./hooks/useLogin";
import LoginForm from "./partials/LoginForm";
import bgimg from "@/assets/image.png";

const Login = () => {
  const { formik, isLoading } = useLogin();

  return (
    <div
      className="relative flex justify-center items-center bg-cover bg-center px-4 w-full min-h-screen"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-black/60 via-black/30 to-black/20" />

      <div className="relative shadow-2xl backdrop-blur-lg p-10 border border-white/20 rounded-2xl w-full max-w-xl">
        <div className="text-center">
          <h1 className="font-bold text-white text-3xl">Welcome Back</h1>
        </div>

        <ExtendedForm
          formik={formik}
          isSubmitting={isLoading}
          className="bg-transparent text-white"
        >
          <div className="mb-4">
            <LoginForm />
          </div>
        </ExtendedForm>

        {/* Footer */}
        <div className="mt-6 text-gray-200 text-sm text-center">
          Forgot your password?{" "}
          <Link
            to="/reset-password"
            className="font-semibold text-blue-300 hover:text-blue-400 transition"
          >
            Reset Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
