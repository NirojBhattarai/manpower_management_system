import React from "react";
import InputText from "@/components/form/FormInputText";

const VerifyOtpForm: React.FC = () => {
  return (
    <div className="h-full w-full  m-5">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>
        <p className="text-gray-600">Enter the OTP sent to your email.</p>{" "}
        {/* OTP */}
        <div className="w-3/4 mx-auto relative mb-8">
          <InputText placeholder="Enter your OTP" label="OTP" name="otp" />
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpForm;
