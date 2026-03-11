import React, { useState } from "react";
import Breadcrumb from "@/components/reusable-component/Breadcrumb";
import PageHeader from "@/common/PageHeader";
import { PATH } from "@/constant/path";
import ExtendedMultiStepForm from "@/components/extended-components/ExtendedMultiStepForm";
import useUpdatePreApprovalDofe from "./hooks/use-update-pre-approval-dofe";
import {
  PreApprovalFormStep1,
  PreApprovalFormStep2,
  PreApprovalFormStep3,
} from "../../partials/pre-approval-dofe-form";

const UpdatePreApprovalDofe: React.FC = () => {
  const [step, setStep] = useState(0);
  const { formik, isLoading, isInitialLoading } = useUpdatePreApprovalDofe();
  return (
    <div className="flex flex-col u-flex-child gap-4">
      <Breadcrumb
        items={[
          { label: "Dashboard", to: PATH.dashboard.dashboard },
          {
            label: "Pre Approval Dofe",
            to: PATH.preApprovalDofe.index,
          },
          {
            label: "Update",
          },
        ]}
      />
      <PageHeader title="Update Pre Approval Dofe" />
      <ExtendedMultiStepForm
        isInitialLoading={isInitialLoading}
        isSubmitting={isLoading}
        formik={formik}
        currentStep={step}
        onStepChange={(step: number) => setStep(step)}
        steps={[
          {
            id: "pre-approval-step-1",
            title: "Step-1",
            content: <PreApprovalFormStep1 />,
          },
          {
            id: "pre-approval-step-2",
            title: "Step-2",
            content: <PreApprovalFormStep2 />,
          },
          {
            id: "pre-approval-step-3",
            title: "Step-3",
            content: <PreApprovalFormStep3 />,
          },
        ]}
      />
    </div>
  );
};

export default UpdatePreApprovalDofe;
