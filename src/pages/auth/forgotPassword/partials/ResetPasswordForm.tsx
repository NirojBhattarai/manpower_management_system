import React, { useState } from "react";
import InputText from "@/components/form/FormInputText";
import { Eye, EyeOff } from "lucide-react";

const ResetPasswordForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });

  return (
    <div className="p-6 w-full h-full">
      <div className="flex flex-col justify-center items-center mb-6">
        <h1 className="mb-4 font-bold text-2xl">Set New Password</h1>
        <p className="text-gray-600">
          Enter the OTP sent to your email and set a new password.
        </p>
      </div>

      <div className="flex flex-col justify-center items-center gap-4">
        <div className="mx-auto w-full max-w-md">
          <InputText
            label="OTP Code"
            name="otpCode"
            placeholder="Enter OTP code"
          />
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <InputText
            label="New Password"
            name="newPassword"
            placeholder="Enter new password"
            type={showPassword.new ? "text" : "password"}
          />
          <button
            type="button"
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                new: !prev.new,
              }))
            }
            className="top-8.5 right-3 absolute text-gray-500"
          >
            {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <InputText
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Enter new password to confirm"
            type={showPassword.confirm ? "text" : "password"}
          />
          <button
            type="button"
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                confirm: !prev.confirm,
              }))
            }
            className="top-8.5 right-3 absolute text-gray-500"
          >
            {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
