import React, { useState } from "react";
import Breadcrumb from "@/components/reusable-component/Breadcrumb";
import { PATH } from "@/constant/path";

import ExtendedMultiStepForm from "@/components/extended-components/ExtendedMultiStepForm";
import useCreatePreApprovalDofe from "./hooks/use-create-pre-approval-dofe";
import {
  PreApprovalFormStep1,
  PreApprovalFormStep2,
  PreApprovalFormStep3,
} from "../../partials/pre-approval-dofe-form";
import PageHeader from "@/common/PageHeader";

const CreatePreApprovalDofe: React.FC = () => {
  const { formik, isPreApprovalLoading } = useCreatePreApprovalDofe();
  const [step, setStep] = useState(0);
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
            label: "Create",
          },
        ]}
      />
      <div className="py-4">
        <PageHeader title="Add Pre-Approval DOFE" />
      </div>
      <ExtendedMultiStepForm
        isSubmitting={isPreApprovalLoading}
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

export default CreatePreApprovalDofe;
