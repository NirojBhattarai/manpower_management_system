import { PATH } from "@/constant/path";
import ChangePassword from "@/pages/auth/changePassword/change-password";
import { lazy } from "react";

const Login = lazy(() => import("@/pages/auth/login/Login"));
const ForgotPassword = lazy(
  () => import("@/pages/auth/forgotPassword/NewPassword"),
);
const VerifyOtp = lazy(() => import("@/pages/auth/otpVerification/VerifyOtp"));
const Reset = lazy(() => import("@/pages/auth/reset/Reset"));

export const publicRoutes = [
  { path: PATH.auth.login, element: <Login /> },
  { path: PATH.auth.verifyOtp, element: <VerifyOtp /> },
  { path: PATH.auth.changePassword, element: <ChangePassword /> },
  { path: PATH.auth.forgotPassword, element: <ForgotPassword /> },
  { path: PATH.auth.resetPassword, element: <Reset /> },
];
