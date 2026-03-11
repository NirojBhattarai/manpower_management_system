import * as Yup from "yup";
export const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});

export type VerifyOtpValues = Yup.InferType<typeof otpSchema>;
