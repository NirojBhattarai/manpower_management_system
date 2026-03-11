import ExtendedForm from "@/components/extended-components/ExtendedForm";
import VerifyOtpForm from "./partials/VerifyOtpForm";
import { useOtpVerification } from "./hooks/useOtpVerification";

function VerifyOtp() {
  const { formik } = useOtpVerification();
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded">
        <ExtendedForm formik={formik} submitText="Verify OTP">
          <VerifyOtpForm />
        </ExtendedForm>
      </div>
    </div>
  );
}

export default VerifyOtp;
