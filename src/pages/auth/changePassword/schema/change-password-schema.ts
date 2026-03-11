import * as Yup from "yup";

export const ChangePasswordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),

  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

export type ChangePasswordFormValues = Yup.InferType<
  typeof ChangePasswordValidationSchema
>;
