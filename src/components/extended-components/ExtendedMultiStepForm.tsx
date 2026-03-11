import { FormikProvider, FormikValues, FormikContextType } from "formik";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import HorizontalDivider from "../reusable-component/HorizontalDivider";
import { Loader } from "lucide-react";
import React from "react";
import LoadingScreen from "../reusable-component/LoadingScreen";

interface Step {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface MultiStepFormProps<T extends FormikValues> {
  formik: FormikContextType<T>;
  steps: Step[];
  currentStep: number;
  onStepChange: (stepIndex: number) => void;
  onClose?: () => void;
  submitText?: string;
  cancelText?: string;
  nextText?: string;
  prevText?: string;
  isSubmitting?: boolean;
  className?: string;
  showCancelBtn?: boolean;
  btnDisabled?: boolean;
  showStepIndicator?: boolean;
  allowStepSkip?: boolean;
  isInitialLoading?: boolean;
}

export default function ExtendedMultiStepForm<T extends FormikValues>({
  formik,
  steps,
  currentStep,
  onStepChange,
  submitText = "Submit",
  cancelText = "Cancel",
  nextText = "Next",
  prevText = "Previous",
  isSubmitting = false,
  className = "",
  showCancelBtn = true,
  showStepIndicator = true,
  allowStepSkip = false,
  isInitialLoading = false,
}: MultiStepFormProps<T>) {
  const navigate = useNavigate();
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  // handle Next click
  const handleNext = async () => {
    if (!isLastStep) {
      onStepChange(currentStep + 1);
    }
  };

  // handle previous
  const handlePrevious = () => {
    if (!isFirstStep) {
      onStepChange(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (allowStepSkip) {
      onStepChange(stepIndex);
    }
  };

  const handleSubmit = () => {
    if (isLastStep) {
      formik.handleSubmit();
    } else {
      handleNext();
    }
  };

  return (
    <FormikProvider value={formik}>
      {!isInitialLoading ? (
        <form
          onSubmit={handleSubmit}
          className={cn(
            "space-y-6 bg-background-200 bg-white shadow-[0px_1px_22px_0px_rgba(0,0,0,0.04)] p-4 rounded-xl",
            className,
          )}
        >
          {/* Step Indicator */}
          {showStepIndicator && (
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={cn(
                      "flex items-center",
                      index < steps.length - 1 && "flex-1",
                    )}
                  >
                    <div
                      className={cn(
                        "flex justify-center items-center rounded-full w-8 h-8 font-medium text-sm transition-colors duration-200",
                        index <= currentStep
                          ? "bg-primary-400 text-white"
                          : "bg-gray-200 text-gray-500",
                        allowStepSkip && "cursor-pointer hover:bg-primary-300",
                      )}
                      onClick={() => handleStepClick(index)}
                    >
                      {index + 1}
                    </div>
                    <div className="ml-2 min-w-0">
                      <p
                        className={cn(
                          "font-medium text-sm truncate",
                          index <= currentStep
                            ? "text-primary-400"
                            : "text-gray-500",
                        )}
                      >
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          "flex-1 mx-4 h-0.5 transition-colors duration-200",
                          index < currentStep
                            ? "bg-primary-400"
                            : "bg-gray-200",
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Step Content */}
          <div className="min-h-75">{steps[currentStep]?.content}</div>

          <div className="px-4">
            <HorizontalDivider />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-10 w-full">
            <FormButton
              variant="previous"
              disabled={isFirstStep}
              onClick={handlePrevious}
              text={prevText}
            />
            <div className="flex items-center gap-x-2">
              {showCancelBtn && (
                <FormButton
                  variant="cancel"
                  text={cancelText}
                  onClick={() => {
                    formik.setErrors({});
                    navigate(-1);
                  }}
                />
              )}
              <FormButton
                variant="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                text={isLastStep ? submitText : nextText}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </form>
      ) : (
        <LoadingScreen height="80vh" />
      )}
    </FormikProvider>
  );
}

type ButtonVariant = "submit" | "cancel" | "previous";

interface ButtonProps {
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  variant: ButtonVariant;
}

const FormButton = ({
  text,
  isLoading = false,
  disabled = false,
  onClick,
  variant,
}: ButtonProps) => {
  const baseClasses =
    "px-4 py-2 flex items-center gap-x-2 typo-mid-bd-reg rounded-lg transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variantClasses: Record<ButtonVariant, string> = {
    submit:
      "bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 focus-visible:ring-secondary-400",

    previous:
      "border border-secondary-500 text-secondary-600 hover:bg-secondary-50 active:bg-secondary-100 focus-visible:ring-secondary-400",

    cancel:
      "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus-visible:ring-red-400",
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      type={variant === "submit" ? "submit" : "button"}
      disabled={isDisabled}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClick?.();
      }}
      className={cn(
        baseClasses,
        variantClasses[variant],
        isDisabled
          ? "opacity-50 cursor-not-allowed shadow-none"
          : "cursor-pointer hover:shadow-md",
      )}
    >
      {isLoading && <Loader className="animate-spin duration-300" size={14} />}
      {text}
    </button>
  );
};
