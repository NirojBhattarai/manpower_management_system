import { useFormik } from "formik";

import { usePostDataMutation } from "@/api/api";
import { otpSchema, VerifyOtpValues } from "../schema/otpVerificationSchema";

const initialValues: VerifyOtpValues = {
  otp: "",
};

export function useOtpVerification() {
  const [verifyOtp, { isLoading }] = usePostDataMutation();

  // const location = useLocation();
  // const passedState = location.state;

  const formik = useFormik<VerifyOtpValues>({
    initialValues,

    validationSchema: otpSchema,
    onSubmit: async (values) => {
      await verifyOtp({
        url: "",
        data: values,
      });
    },
  });

  return { formik, isLoading };
}
