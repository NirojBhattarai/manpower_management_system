import { PATH } from "@/constant/path";
import useUserVerify from "@/pages/auth/login/hooks/verifyUser";
import { Loader } from "lucide-react";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouteWrapper = ({ children }: { children?: React.ReactNode }) => {
  const { userVerifyResponse, isLoading } = useUserVerify();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 h-screen">
        <Loader className="animate-spin duration-300" />
        <p className="text-xs">Authenticating user please wait...</p>
      </div>
    );
  }

  if (!userVerifyResponse?.data?.isAuthenticated) {
    return <Navigate to={PATH.auth.login} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default PrivateRouteWrapper;
