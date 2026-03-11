import React from "react";
import InputText from "@/components/form/FormInputText";

const LoginForm: React.FC = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center items-center mb-6">
        <p className="text-white text-xs">
          Please enter your credentials to continue.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        {/* Email */}
        <div className="mx-auto mb-4 w-full max-w-md">
          <InputText
            placeholder="Enter your email"
            label="Email"
            name="email"
            labelClassName="text-white"
            errorMessageClassName="text-red-500 font-bold"
            className="text-white"
          />
        </div>
        {/* Password */}
        <div className="mx-auto mb-4 w-full max-w-md">
          <InputText
            label="Password"
            name="password"
            placeholder="Enter your password"
            labelClassName="text-white"
            errorMessageClassName="text-red-500 font-bold"
            className="text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
