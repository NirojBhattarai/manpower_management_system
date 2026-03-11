import * as Yup from "yup";

export const newPasswordValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  otpCode: Yup.string().required("OTP code is required"),
});

export type NewPasswordFormValues = Yup.InferType<
  typeof newPasswordValidationSchema
>;
